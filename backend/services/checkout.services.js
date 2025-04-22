'use strict'

const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const inventoryModel = require("../models/inventory.model");
const orderModel = require("../models/order.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { default: mongoose } = require("mongoose");
const convertToMongodbObj = require("../utils/convertToMongodbObj").convertToMongodbObj;
const { insertInventory } = require("./inventory.services");
const userModel = require("../models/user.model");

const checkProductByServer = async (productID, quantity,product_thumbnail) => {
  const foundProduct = await productModel.findById(productID);
  if (!foundProduct) throw new NotFoundError(`Không tìm thấy sản phẩm với ID: ${productID}`);

  const inventory = await inventoryModel.findOne({ inventory_product_id: productID });
  if (!inventory || inventory.inventory_stock < quantity) {
    throw new BadRequestError(`Sản phẩm '${foundProduct.product_name}' không đủ tồn kho`);
  }

  return {
    productID: foundProduct._id,
    product_name: foundProduct.product_name,
    price: foundProduct.product_price,
    quantity,
    product_thumbnail,
    rawPrice: foundProduct.product_price * quantity
  };
};

const checkoutReviewService = async ({cartID}) => {

  // 1. Kiểm tra cart tồn tại
  const foundCart = await cartModel.findById(cartID);
  if (!foundCart) throw new NotFoundError("Không tìm thấy giỏ hàng");

  const reviewProducts = [];
  let totalRawPrice = 0;

  for (let item of foundCart.cart_products) {
    const { productID, quantity, product_thumbnail } = item;

    // 2. Kiểm tra sản phẩm và tồn kho
    const reviewedItem = await checkProductByServer(productID, quantity,product_thumbnail);
    reviewProducts.push(reviewedItem);
    totalRawPrice += reviewedItem.rawPrice;
  }

  // 3. Tính toán đơn hàng
  const shippingFee = 20000; // giả định phí ship cố định
  const discount = 0; // chưa áp dụng
  const totalPrice = totalRawPrice + shippingFee - discount;

  // 4. Trả về thông tin review
  return {
    totalRawPrice,
    discount,
    shippingFee,
    totalPrice,
    products: reviewProducts
  };
};


const orderService = async (payload) => {
  const {
    order_user_id,
    order_username,
    order_phone,
    order_shipping,
    order_payment,
    order_checkout,
    order_products
  } = payload;

  try {
    const validatedProducts = [];

    for (const item of order_products) {
      const { productID, quantity, product_thumbnail } = item;

      const foundProduct = await productModel.findById(productID);
      if (!foundProduct) {
        throw new NotFoundError(`Không tìm thấy sản phẩm với ID: ${productID}`);
      }

      const inventory = await inventoryModel.findOne({ inventory_product_id: productID });
      if (!inventory || inventory.inventory_stock < quantity) {
        throw new BadRequestError(`Sản phẩm '${foundProduct.product_name}' không đủ tồn kho`);
      }

      // Trừ tồn kho
      inventory.inventory_stock -= quantity;
      await inventory.save();

      validatedProducts.push({
        productID,
        product_name: foundProduct.product_name,
        price: foundProduct.product_price,
        quantity,
        product_thumbnail,
        rawPrice: foundProduct.product_price * quantity
      });
    }

    // Tạo đơn hàng
    const newOrder = await orderModel.create({
      order_user_id,
      order_username,
      order_phone,
      order_shipping,
      order_payment,
      order_checkout,
      order_products: validatedProducts,
      order_status: "pending"
    });

    // Xoá giỏ hàng của user sau khi đặt hàng
    if(newOrder){
      console.log("delete cart");
      await cartModel.findOneAndDelete({ cart_user: order_user_id });
    }

    return newOrder;
  } catch (err) {
    throw err;
  }
};

const getAllOrder = async (page = 1, limit = 10, status) => {
  const skip = (page - 1) * limit;
  console.log('limit',limit)
  const query = {};
  if (status && status !== 'all') {
    query.order_status = status;
  }
  console.log('query',query)
  const orders = await 
    orderModel.find(query)
      .skip(skip)
      .limit(limit)
      .lean()

  const total = await orderModel.find({}).countDocuments();
  return {
    orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  };
};

const getOrderByUser = async (userID, page = 1, limit = 10, status) => {
  const skip = (page - 1) * limit;

  const query = { order_user_id: userID };
  if (status && status !== 'all') {
    query.order_status = status;
  }
  const orders = await orderModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  const total = await orderModel.countDocuments(query);

  if (!orders || orders.length === 0) {
    return new NotFoundError('Không tìm thấy đơn hàng của người dùng này');
  }

  return {
    orders,
    pagination: {
      page,
      limit,
      totalItems: total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getOrderbyID = async (orderID, userID) => {
  const user = await userModel.findById(userID).lean();
  if (!user) throw new NotFoundError('Người dùng không tồn tại');

  const order = await orderModel.findById(orderID).lean();
  if (!order) throw new NotFoundError('Không tìm thấy đơn hàng');

  if (user.roles !== 'AD' && order.order_user_id.toString() !== userID.toString()) {
    throw new NotFoundError('Bạn không có quyền truy cập đơn hàng này');
  }

  return order;
};


const cancelOrder = async ({orderID,reason,userID}) => {
  const user = await userModel.findById(userID).lean();

    const order = await orderModel.findById(orderID);

    if (!order) {
      return new NotFoundError({ message: 'Đơn hàng không tồn tại!' });
    }
    order.cancel_order = {
      reason: reason || 'Khách hàng hủy đơn hàng',
      by: user.username,
    };
    order.order_status = 'cancelled';
    for (const product of order.order_products) {
      const inventory = await inventoryModel.findOne({ inventory_product_id: product.productID });

      if (inventory) {
        inventory.inventory_stock += product.quantity;
        await inventory.save();
      } else {
        await insertInventory({
          inventory_product_id: product.productID,
          inventory_stock: product.quantity,
        })
      }
    }
    // Lưu lại thông tin hủy vào đơn hàng
    return await order.save();
  
};  


const confirmOrder =async ({orderID,userID})=>{
  const user = await userModel.findById(userID).lean();
  if (!user) throw new NotFoundError('Người dùng không tồn tại');
  const order = await orderModel.findById(orderID);
    if (!order) {
      return new NotFoundError({ message: 'Đơn hàng không tồn tại!' });
    }
    if (order.order_user_id.toString() !== userID.toString()) {
      throw new NotFoundError('Bạn không có quyền truy cập đơn hàng này');
    }  
    order.order_status = 'completed';
    for(const orderItem of order.order_products){
      const product = await productModel.findById(orderItem.productID).lean()
      if(!product) throw new NotFoundError('Không tìm thấy sản phẩm');
      await productModel.findByIdAndUpdate(orderItem.productID, {
        $inc: { product_sold: orderItem.quantity }
      });
    }
    return await order.save();

}
module.exports = {
  checkoutReviewService,
  orderService,
  getOrderbyID,
  getOrderByUser,
  getAllOrder,
  cancelOrder,
  confirmOrder
};



/*
    cart_user,
    userID,
    
    "user_order": [
    {
       discount = [],
      "cart_products": [
        {   
           productID,
           quantity
           price

        }
      ]

    }
  ]
*/