'use strict'

const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const inventoryModel = require("../models/inventory.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");

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


const orderByUser = async ({ user_order, cartID, userID, payment, address }) => {
  // 1. Gọi review để xác thực dữ liệu & tính toán tổng giá
  const reviewResult = await checkoutReview({
    userID,
    cartID,
    user_order
  });

  // 2. Tạo dữ liệu đơn hàng
  const newOrder = await orderModel.create({
    order_user_id: userID,
    order_products: reviewResult.products,
    order_checkout: {
      totalPrice: reviewResult.totalPrice,
      totalApplyDiscount: reviewResult.discount,
      shippingFee: reviewResult.shippingFee
    },
    order_shipping: {
      street: address?.street || '',
      ward: address?.ward || '',
      district: address?.district || '',
      city: address?.city || '',
      country: address?.country || 'Vietnam'
    },
    order_payment: {
      paymentMethod: payment?.method || 'COD',
      paymentStatus: payment?.status || 'pending'
    },
    order_status: 'pending'
  });

  // 3. (Optional) Cập nhật trạng thái giỏ hàng
  await cartModel.findByIdAndUpdate(cartID, {
    cart_state: 'completed'
  });

  // 4. Trả về thông tin order đã tạo
  return {
    message: 'Đặt hàng thành công',
    order: newOrder
  };
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
  checkoutReviewService
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