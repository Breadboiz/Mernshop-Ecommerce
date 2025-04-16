'use strict';

const express = require('express');
const router = express.Router();

//Auth routes
router.use('/auth', require('./auth-routes')); //gọi từ auth-routes

//Product routes 
router.use('/products', require('./products-routes')); //gọi từ products-routes

router.use('/cart', require('./cart-routes')); //gọi từ cart-routes
module.exports = router;