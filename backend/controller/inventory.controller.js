'use strict'
const { SuccessResponse } = require('../core/success.response');
const { updateInventoryQuantity } = require('../services/inventory.services');

const updateInventoryStock = async (req, res, next) => {
    console.log(req.params.productID);
    new SuccessResponse({
        message: 'update inventory stock successfully',
        metadata: await updateInventoryQuantity(req.params.productID, req)
    }).send(res);
};

module.exports = { updateInventoryStock };