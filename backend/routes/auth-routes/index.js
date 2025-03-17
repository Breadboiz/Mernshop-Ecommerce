'use strict';

const express = require('express');
const router = express.Router();
const {register} = require('../../controller/auth.controller');
const asyncHandler = require('../../helpers/asynchandler');


router.post('/register', asyncHandler(register));

module.exports = router;