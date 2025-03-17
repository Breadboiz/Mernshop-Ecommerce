'use strict';

const express = require('express');
const router = express.Router();

//Auth routes
router.use('/auth', require('./auth-routes')); //gọi từ auth-routes

//Product routes 
module.exports = router;