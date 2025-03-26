'use strict';

const express = require('express');
const router = express.Router();
const {register,login, logout, refreshToken} = require('../../controller/auth.controller');
const asyncHandler = require('../../helpers/asynchandler');
const {protectRoutes} = require('../../middlewares/protectRoute');


router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

router.use(asyncHandler(protectRoutes));
router.post('/logout', asyncHandler(logout));

router.post('/refreshtoken', asyncHandler(refreshToken));

module.exports = router; 