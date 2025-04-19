'use strict';

const express = require('express');
const router = express.Router();
const { updateInventoryStock } = require('../../controller/inventory.controller');
const asyncHandler = require('../../helpers/asynchandler');
const { protectRoutes } = require('../../middlewares/protectRoute');


router.put('/:productID',asyncHandler(protectRoutes), asyncHandler(updateInventoryStock));

module.exports = router;