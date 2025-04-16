'use strict'

const cartModel = require("../models/cart.model");
const { ErrorResponse,NotFoundError,BadRequestError } = require("../core/error.response");
const productModel = require("../models/product.model");
const mongoose = require('mongoose');

/**
 * Chuyển string thành mongoose ObjectId
 * @param {string} id 
 * @returns {mongoose.Types.ObjectId}
 */
const toObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`❌ ID không hợp lệ: ${id}`);
  }
  return new mongoose.Types.ObjectId(id);
};


const createUserCart= async ({ userID,  product}) => {
    console.log(product);
    const query = {cart_user: userID, cart_state: "active"},
    updateOrInsert = {
        $addToSet: {
            cart_products: product
        }
    }, options = {upsert: true, new: true}
    return await cartModel.findOneAndUpdate(query, updateOrInsert, options);
}
const updateQuantity = async ({userID, product}) => {
    const { quantity,productID} = product;
    console.log(product);
    const query = {cart_user: userID, 
                   "cart_products.productID": productID,
                   cart_state: "active"}, 
    updateSet = {
        $inc: {
            "cart_products.$.quantity": quantity
        }
    }, options = {upsert: true, new: true}
    console.log(query);
    const result = await cartModel.findOneAndUpdate(query, updateSet, options);
    if(!result) throw new NotFoundError("Cart not found");
    return result;
}
//add product to cart
const addToCartService = async ({ userID, product }) => {
    const userCart = await cartModel.findOne({ cart_user: userID, cart_state: "active" });
  
    if (!userCart) {
      // Nếu user chưa có cart
      return await createUserCart({ userID, product });
    }
  
    // Nếu cart rỗng
    if (userCart.cart_products.length === 0) {
      userCart.cart_products = [product];
      return await userCart.save();
    }
  
    const existingProductIndex = userCart.cart_products.findIndex(
      (item) => item.productID.toString() === product.productID.toString()
    );
  
    if (existingProductIndex !== -1) {
      return await updateQuantity({ userID, product });
    } else {
      userCart.cart_products.push(product);
      return await userCart.save();
    }
  };

const addToCartServiceV2 = async ({userID, user_order}) => {
    const {productID, quantity, old_quantity} = user_order[0]?.item_products[0];
    const foundProduct = await productModel.findById(productID);
    if(!foundProduct) throw new NotFoundError("Product not found");
    if(quantity <= 0) {
        //delete
    };
    return await updateQuantity({userID, product:{
        productID,
        quantity: quantity - old_quantity
    }});
}

const deleteUserCartService = async ({userID, productID}) => {
    const query = {cart_user: userID, cart_state: "active"},
    updateSet = {
        $pull: {
            cart_products: {
                productID: productID
            }
        }
    },
    options = {upsert: true, new: true}
    return await cartModel.findOneAndUpdate(query, updateSet, options);
}
//update cart
/*
    user_order: {
        userID,
        item_products: [
            {
                quantity,
                price,
                old_quantity,
                productId
            },
        ],
        version
    }
*/
const getListCartService = async ({userID}) => {
    console.log(userID);
    const query = {cart_user: userID, cart_state: "active"};
    return await cartModel.findOne(query);
}
module.exports = {
    addToCartService,
    addToCartServiceV2,
    deleteUserCartService,
    getListCartService
}