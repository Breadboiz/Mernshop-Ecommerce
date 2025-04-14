'use strict'

const { SuccessResponse, OK } = require('../core/success.response');
const { CREATED } = require('../core/success.response');
const { NotFoundError } = require('../core/error.response');
const { BadRequestError } = require('../core/error.response');
const {createProductService, deleteProductService, getAllProductService, getCategoriesService, getBrandService, getProductService,updateProductService} = require('../services/product.services');

const createProduct = async (req, res) => {
  
    return new CREATED(
        {message: "Product created successfully",
        metadata: await createProductService(req)})
        .send(res);
}

const getAllProduct= async (req, res ) => {
    return new OK({
        message: "Get all product successfully",
        metadata: await getAllProductService(req)
    }).send(res)
}


const getBrand = async (req, res) => {
    return new OK({
        message: "Get all product successfully",
        metadata: await getBrandService()
    }).send(res)
}
const getCategories = async (req, res) => {
    return new OK({
        message: "Get all categories successfully",
        metadata: await getCategoriesService()
    }).send(res)
}
const updateProduct = async (req, res) => {
    return new OK({
        message: "Update product successfully",
        metadata: await updateProductService(req.params.id, req)
    }).send(res)
}
const deleteProduct = async (req, res) => {
    return new OK({
        message: "Delete product successfully",
        metadata: await deleteProductService(req.params.id)
    }).send(res)
}
const getProduct = async (req, res) => {
    const value = req.params.value
    return new OK({
        message: "Get product successfully",
        metadata: await getProductService(value)
    }).send(res)
}

module.exports = {createProduct ,getAllProduct, deleteProduct, getAllProduct, getBrand, getCategories ,getProduct, updateProduct};   