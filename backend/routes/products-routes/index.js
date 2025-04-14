'use strict'

const express = require('express');
const router = express.Router();
const {protectRoutes, adminRoutes} = require('../../middlewares/protectRoute');
const asyncHandler = require('../../helpers/asynchandler');
const {createProduct, getAllProduct, deleteProduct, getCategories, getBrand,getProduct,updateProduct} = require('../../controller/product.controller');
//const { uploadDisk } = require('../../config/config.multer');
const multer = require('multer');




const {storage} = require("../../config/config.cloudinay");
const upload = multer({storage: storage});

router.post('/createProduct',asyncHandler(protectRoutes), asyncHandler(adminRoutes),
  upload.fields([
    { name: 'product_images', maxCount: 10 },
    { name: 'product_thumbnail', maxCount: 1 },
  ]),asyncHandler(createProduct));
router.put('/updateProduct/:id',asyncHandler(protectRoutes), asyncHandler(adminRoutes),upload.fields([
  { name: 'product_images', maxCount: 10 },
  { name: 'product_thumbnail', maxCount: 1 },
]), asyncHandler(updateProduct));  
router.delete('/deleteProduct/:id',asyncHandler(protectRoutes), asyncHandler(adminRoutes), asyncHandler(deleteProduct));


router.get('/', asyncHandler(getAllProduct));
router.get('/product/:value', asyncHandler(getProduct));
//router.delete('/deleteProduct/:id', asyncHandler(deleteProduct));
router.get('/categories', asyncHandler(getCategories));

router.get('/brands', asyncHandler(getBrand));


module.exports = router;