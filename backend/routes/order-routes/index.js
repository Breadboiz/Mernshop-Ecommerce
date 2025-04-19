'use strict';

const express = require('express');
const router = express.Router();
const { placeOrder } = require('../../controller/order.controller');
const asyncHandler = require('../../helpers/asynchandler');
const { protectRoutes } = require('../../middlewares/protectRoute');


router.post('/',asyncHandler(protectRoutes), asyncHandler(placeOrder));

module.exports = router;