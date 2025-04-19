'use strict';

const express = require('express');
const router = express.Router();
const { checkoutReview } = require('../../controller/checkout.controller');
const asyncHandler = require('../../helpers/asynchandler');
const { protectRoutes } = require('../../middlewares/protectRoute');


router.get('/',asyncHandler(protectRoutes), asyncHandler(checkoutReview));

module.exports = router;