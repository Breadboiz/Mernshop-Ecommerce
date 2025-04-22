'use strict'
const { SuccessResponse } = require('../core/success.response');
const { orderService,getAllOrder,getOrderByUser, getOrderbyID, cancelOrder, confirmOrder } = require('../services/checkout.services');

const placeOrder = async (req, res, next) => {
    return  new SuccessResponse({
        message: 'Place order successfully',
        metadata: await orderService(req.body)
    }).send(res);
};

const findAllOrder = async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    return new SuccessResponse({
        message: "get all order in database",
        metadata: await getAllOrder(page, limit, status)
    }).send(res)    
}

const findOrderByUser = async(req, res)=>{
    const status = req.query.status || 'all';
    console.log('status',status)
    const userID = req.params.userID || ''
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    return new SuccessResponse({
      message: 'Lấy danh sách đơn hàng thành công',
      metadata: await getOrderByUser(userID, page, limit, status)
    }).send(res);
}

const findOrderByID = async(req,res)=>{
    const userID = req.user.id || ''
    const Id = req.params.orderID || ''
    return new SuccessResponse({
        message: `get order ${Id}`,
        metadata: await getOrderbyID(Id,userID)
    }).send(res)
 }
const cancelOrderByID = async(req,res)=>{
    const orderID = req.params.orderID || ''
    const reason = req.body.reason || ''
    const userID = req.user.id || ''
    return new SuccessResponse({
        message: `hủy đơn hàng ${orderID} thành công`,
        metadata: await cancelOrder({orderID,reason,userID})
    }).send(res)
}

const confirmOrderByUser = async(req,res)=>{
    const orderID = req.params.orderID || ''
    const userID = req.user.id || ''
    return new SuccessResponse({
        message: `xác nhận đơn hàng ${orderID} thành công`,
        metadata: await confirmOrder({orderID,userID})
    }).send(res)
}
module.exports = { placeOrder,
                   findAllOrder,
                   findOrderByID,
                   findOrderByUser,
                   confirmOrderByUser,
                   cancelOrderByID };