'use strict';

const productModel = require("../models/product.model");
const { NotFoundError } = require("../core/error.response");
const createProduct = async (payload) => {
    try {
        const { product_name, product_branch, product_inStock, product_price, prroduct_description, product_image} = payload;
        const product = await productModel.create({
            product_name,
            product_branch,
            product_inStock,
            product_price,
            prroduct_description,
            product_image
        })
        return product;
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (id) => {
    try {
        const { product_name, product_branch, product_inStock, product_price, prroduct_description, product_image} = payload;
        const updateProduct = await productModel.findOneAndUpdate({ _id: id }, {
            product_name,
            product_branch,
            product_inStock,
            product_price,
            prroduct_description,
            product_image
        })
        return product;
    } catch (error) {
        console.log(error);
    }
}
const deleteProduct = async (id) => {
    try {
        const product = await productModel.findOneAndDelete({ _id: id });
        if(!product) throw new NotFoundError("Product not found");
        return product;
    } catch (error) {
        console.log(error);
    }
}
const getallProduct = async () => {
    try {
        const product = await productModel.find();
        return product;
    } catch (error) {
        console.log(error);
    }
}

const getProductByName = async (name) => {
    try {
        const product = await productModel.find({ product_name: name });
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        return product;
    } catch (error) {
        console.log(error);
    }
}

const getProductByBranch = async (branch) => {
    try {
        const product = await productModel.find({ product_branch: branch });
        return product;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createProduct };