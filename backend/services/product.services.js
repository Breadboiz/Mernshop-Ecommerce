'use strict';

const productModel = require("../models/product.models");
const { NotFoundError ,BadRequestError } = require("../core/error.response");
const {uploadFromLocal} = require("../services/upload.services");
const { cloudinary } = require("../config/config.cloudinay");
const productModels = require("../models/product.models");
const { filter } = require("compression");
const createProductService = async (req) => {
    try {
      const file = req.file;
      if (!file) {
        throw new BadRequestError("Image not found");
      }
      const {product_name,product_brand,product_inStock,product_price,product_description,product_category} = req.body;
      // Dữ liệu từ Cloudinary
      const imageUrl = file.path; // secure_url
      const publicId = file.filename; // public_id (để xoá/biến thể sau này nếu cần)
      console.log(imageUrl);
      const product = new productModel({
        product_name,
        product_brand,
        product_inStock,
        product_price,
        product_description,
        product_category,
        product_thumbnail: {
          url: imageUrl,
          public_id: publicId,
        }, // dùng URL đầy đủ của ảnh
      });
  
      const result = await product.save();
      console.log(" Product saved:", result);
      return result;
  
    } catch (error) {
      console.error(" Error creating product:", error);
      throw error; // hoặc return null tùy logic của bạn
    }
  };

  const updateProductService = async (id, req) => {
    try {
      const product = await productModel.findById(id);
      if (!product) throw new NotFoundError("Product not found");
  
      const file = req.file;
  
      const {
        product_name,
        product_brand,
        product_inStock,
        product_price,
        product_description
      } = req.body;
  
      // Cập nhật thông tin văn bản
      if (product_name) product.product_name = product_name;
      if (product_brand) product.product_brand = product_branch;
      if (product_inStock) product.product_inStock = product_inStock;
      if (product_price) product.product_price = product_price;
      if (product_description) product.product_description = product_description;
  
      // Nếu có ảnh mới được upload
      if (file) {
        // Xóa ảnh cũ khỏi Cloudinary nếu có
        if (product.product_thumbnail?.public_id) {
          await cloudinary.uploader.destroy(product.product_thumbnail.public_id);
        }
  
        // Cập nhật ảnh mới từ file
        product.product_thumbnail = {
          url: file.path,         // secure_url
          public_id: file.filename, // public_id
        };
      }
  
      const updated = await product.save();
      console.log("✅ Product updated:", updated);
      return updated;
  
    } catch (error) {
      console.error("❌ Error updating product:", error);
      throw error;
    }
  };

const deleteProductService = async (id) => {
    try {
        const product = await productModel.findByIdAndDelete({ _id: id });
        const {public_id} = product.product_thumbnail
        await cloudinary.uploader.destroy(public_id)
        if(!product) throw new NotFoundError("Product not found");
        return product;
    } catch (error) {
        console.log(error);
    }
}

const  getBrandService = async () => {
  try {
    const branches = await productModel.distinct('product_brand');  // Lấy các chi nhánh duy nhất
    return branches
  } catch (error) {
    throw new NotFoundError(error);
  }
}
const getCategoriesService = async () =>{
  try {
    const categories = await productModel.distinct('product_category');  // Lấy các danh mục duy nhất
    return categories
  } catch (error) {
    throw new NotFoundError(error);
  }
}


const getProductService = async (req) => {
  try {
    const filters = { ...req.query.filter } || {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

      console.log(search);
      if(search) {
        filters.$text = {$search: search} //full-text search
      } 
      const total = await productModel.countDocuments(filters);

      const products = await productModel
        .find(filters)
        .skip(skip)
        .limit(limit).sort({createdAt: -1});

      return {totalPages: Math.ceil(total / limit),
              products};
  } catch (error) {
      console.error('Lỗi khi tìm sản phẩm:', error); // Log lỗi trên console máy chủ
  }
};
module.exports = { createProductService,
                   deleteProductService,
                   getProductService, 
                   getCategoriesService,
                   getBrandService};
