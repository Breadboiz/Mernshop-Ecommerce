'use strict';

const express = require('express');
const router = express.Router();
const asyncHandler = require('../../helpers/asynchandler');
const {protectRoutes, protectRefreshToken} = require('../../middlewares/protectRoute');
const {addToCart, updateCart, deleteCart, getCart} = require('../../controller/cart.controller');


router.get('',asyncHandler(protectRoutes) ,asyncHandler(getCart));
router.post('',asyncHandler(protectRoutes),asyncHandler(addToCart));
router.put('/update',asyncHandler(protectRoutes) ,asyncHandler(updateCart));
router.delete('',asyncHandler(protectRoutes) ,asyncHandler(deleteCart));

module.exports = router; 