'use strict';

const express = require('express');
const router = express.Router();
const asyncHandler = require('../../helpers/asynchandler');
const {protectRoutes, protectRefreshToken} = require('../../middlewares/protectRoute');
const {addToCart, updateCart, deleteCart, getCart} = require('../../controller/cart.controller');



router.post('',asyncHandler(addToCart));
router.put('/update' ,asyncHandler(updateCart));
router.delete('' ,asyncHandler(deleteCart));
router.get('' ,asyncHandler(getCart));

module.exports = router; 