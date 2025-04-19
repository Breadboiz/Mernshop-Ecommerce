'use strict'
const { SuccessResponse } = require('../core/success.response');
const { orderService } = require('../services/checkout.services');

const placeOrder = async (req, res, next) => {
    new SuccessResponse({
        message: 'Place order successfully',
        metadata: await orderService(req.body)
    }).send(res);
};

module.exports = { placeOrder };