'use strict';

const express = require('express');
const router = express.Router();

//Auth routes
router.use('/auth', require('./auth-routes')); //gọi từ auth-routes

//Product routes 
router.use('/products', require('./products-routes')); //gọi từ products-routes

router.use('/cart', require('./cart-routes')); //gọi từ cart-routes

router.use('/user', require('./user-routes')); //gọi từ user-routes

router.use('/checkout', require('./checkout-routes')); //gọi từ checkout-routes

router.use('/order', require('./order-routes')); //gọi từ order-routes

router.use('/inventory', require('./inventory')); //gọi từ inventory
module.exports = router;