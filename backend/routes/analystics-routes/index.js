'use strict'

const express = require('express');
const router = express.Router();

const {protectRoutes, adminRoutes} = require('../../middlewares/protectRoute');
const asyncHandler = require('../../helpers/asynchandler');
const {getAnalytics} = require('../../controller/analystics.controller');

router.get('/', asyncHandler(getAnalytics))

// router.put('/')
module.exports = router;