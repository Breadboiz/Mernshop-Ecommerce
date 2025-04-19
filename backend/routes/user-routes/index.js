'use strict'

const express = require('express');
const router = express.Router();

const {protectRoutes, adminRoutes} = require('../../middlewares/protectRoute');
const asyncHandler = require('../../helpers/asynchandler');
const {updateUser} = require('../../controller/user.controller');

router.put('/update',asyncHandler(protectRoutes), asyncHandler(updateUser));

module.exports = router;