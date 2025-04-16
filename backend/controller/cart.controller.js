'use strict'

const { SuccessResponse } = require('../core/success.response');
const {  addToCartService,
         addToCartServiceV2,
         deleteUserCartService,
         getListCartService } = require('../services/cart.services');

const addToCart = async (req, res) => {
    return new SuccessResponse({
        message: "add to cart successfully",
        metadata: await addToCartService(req.body)
    }).send(res);
}

const updateCart = async (req, res) => {
    return new SuccessResponse({
        message: "update cart successfully",
        metadata: await addToCartServiceV2(req.body)
    }).send(res);
}   

const deleteCart = async (req, res) => {
    return new SuccessResponse({
        message: "delete cart successfully",
        metadata: await deleteUserCartService(req.body)
    }).send(res);
}

const getCart = async (req, res) => {
    return new SuccessResponse({
        message: "get cart successfully",
        metadata: await getListCartService(req.body)
    }).send(res);
}

module.exports = {
    addToCart,
    updateCart,
    deleteCart,
    getCart
}