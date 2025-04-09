'use strict';

const express = require('express');
const router = express.Router();
const {register,login, logout, refreshToken} = require('../../controller/auth.controller');
const asyncHandler = require('../../helpers/asynchandler');
const {protectRoutes, protectRefreshToken} = require('../../middlewares/protectRoute');


router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

router.post('/logout',asyncHandler(protectRoutes) ,asyncHandler(logout));

router.post('/refreshtoken',asyncHandler(protectRefreshToken) ,asyncHandler(refreshToken));

module.exports = router; 