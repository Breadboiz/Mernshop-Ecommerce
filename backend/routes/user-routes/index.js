'use strict'

const express = require('express');
const router = express.Router();

const {protectRoutes, adminRoutes} = require('../../middlewares/protectRoute');
const asyncHandler = require('../../helpers/asynchandler');
const {updateUser,changeUserStatus,findAllUser, findUserByID} = require('../../controller/user.controller');

router.get('', asyncHandler(protectRoutes), asyncHandler(adminRoutes), asyncHandler(findAllUser))
router.get('/:id', asyncHandler(protectRoutes), asyncHandler(findUserByID))

router.put('/update',asyncHandler(protectRoutes), asyncHandler(updateUser));
// router.put('/')
module.exports = router;