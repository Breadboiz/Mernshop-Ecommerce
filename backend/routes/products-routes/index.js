'use strict'

const express = require('express');
const router = express.Router();
const {protectRoutes} = require('../../middlewares/protectRoute');
const {asyncHandle} = require('../../helpers/asynchandler')

router.use(asyncHandle(protectRoutes));

module.exports = router;