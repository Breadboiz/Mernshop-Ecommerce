'use strict';

const express = require('express');
const router = express.Router();
const {
  placeOrder,
  findAllOrder,
  findOrderByID,
  findOrderByUser,
  cancelOrderByID,
  confirmOrderByUser
} = require('../../controller/order.controller');
const asyncHandler = require('../../helpers/asynchandler');
const { protectRoutes, adminRoutes } = require('../../middlewares/protectRoute');

router.get('/user/:userID', asyncHandler(protectRoutes), asyncHandler(findOrderByUser));   
router.get('/detail/:orderID', asyncHandler(protectRoutes), asyncHandler(findOrderByID));       
router.get('', asyncHandler(protectRoutes), asyncHandler(adminRoutes), asyncHandler(findAllOrder)); 
router.post('/', asyncHandler(protectRoutes), asyncHandler(placeOrder));                           
router.post('/cancel/:orderID', asyncHandler(protectRoutes), asyncHandler(cancelOrderByID));
router.post('/confirm/:orderID', asyncHandler(protectRoutes), asyncHandler(confirmOrderByUser));

module.exports = router;
