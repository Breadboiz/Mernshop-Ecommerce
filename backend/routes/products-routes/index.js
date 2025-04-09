'use strict'

const express = require('express');
const router = express.Router();
const {protectRoutes, adminRoutes} = require('../../middlewares/protectRoute');
const asyncHandler = require('../../helpers/asynchandler');

const {createProduct, getAllProduct, deleteProduct, getCategories, getBrand} = require('../../controller/product.controller');
//const { uploadDisk } = require('../../config/config.multer');
const multer = require('multer');

const {storage} = require("../../config/config.cloudinay");
const upload = multer({storage: storage});

router.post('/createProduct',asyncHandler(protectRoutes), asyncHandler(adminRoutes), upload.single('product_image') ,asyncHandler(createProduct));
router.delete('/deleteProduct/:id',asyncHandler(protectRoutes), asyncHandler(adminRoutes), asyncHandler(deleteProduct));

router.get('/', asyncHandler(getAllProduct));

//router.delete('/deleteProduct/:id', asyncHandler(deleteProduct));

router.get('/getProduct', asyncHandler(getAllProduct));

router.get('/categories', asyncHandler(getCategories));

router.get('/brands', asyncHandler(getBrand));


module.exports = router;