'use strict'

const { SuccessResponse } = require('../core/success.response');
const { checkoutReviewService } = require('../services/checkout.services');

const checkoutReview = async (req, res) =>{
   const cartID = req.query.cartID || '';
   console.log(cartID);
    return new SuccessResponse({
        message: "checkout review",
        metadata: await checkoutReviewService({cartID})
    }).send(res);
}

module.exports = { checkoutReview }