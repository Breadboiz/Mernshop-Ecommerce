'use strict'

const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const inventoryModel = require("../models/inventory.model");
const orderModel = require("../models/order.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { default: mongoose } = require("mongoose");

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



const getOrderByUser = async (userID) => {
  const orders = await orderModel.find({ order_user_id: userID });
  if (!orders) throw new NotFoundError('Không tìm thấy đơn hàng');
  return orders;
};


const getOneOrder = async (orderID) => {
  const order = await orderModel.findById(orderID);
  if (!order) throw new NotFoundError('Không tìm thấy đơn hàng');
  return order;
};

const cancelOrder = async (orderID) => {
  const order = await orderModel.findById(orderID);
  if (!order) throw new NotFoundError('Không tìm thấy đơn hàng');
  order.order_status = 'canceled';
  await order.save();
  return order;
};  

module.exports = {
  checkoutReviewService,
  orderService
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