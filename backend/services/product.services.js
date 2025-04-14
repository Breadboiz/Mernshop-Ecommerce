'use strict';

const productModel = require("../models/product.models");
const { NotFoundError ,BadRequestError } = require("../core/error.response");
const { cloudinary } = require("../config/config.cloudinay");

const createProductService = async (req) => {
  try {
    const files = req.files;

    if (!files || !files["product_thumbnail"] || !files["product_images"]) {
      throw new BadRequestError("Thiếu ảnh thumbnail hoặc images");
    }

    const thumbnail = {
      url: files["product_thumbnail"][0].path,
      public_id: files["product_thumbnail"][0].filename,
    };

    const images = files["product_images"].map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const {
      product_name,
      product_brand,
      product_inStock,
      product_price,
     
      product_description,
      product_category,
      product_material,
      product_mechanism,
      product_water_resistance,
      product_case_diameter,
      product_band_material,
      product_dial_design,
      product_warranty,
      } = req.body;

    // Thumbnail


    const product = new productModel({
      product_name,
      product_brand,
      product_inStock,
      product_price,
     
      product_description,
      product_category,
      product_material,
      product_mechanism,
      product_water_resistance,
      product_case_diameter,
      product_band_material,
      product_dial_design,
      product_warranty,
  
      product_thumbnail: thumbnail,
      product_images: images,
    });

    const result = await product.save().catch((err) => console.log(err));
    if (!result) {
      throw new BadRequestError("Product not created");
    }
    return result;

  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
const updateProductService = async (id, req) => {
  try {
    const product = await productModel.findById(id);
    if (!product) throw new NotFoundError("Product not found");

    const files = req.files;
    console.log("-----------------------------");
    console.log("req.body", req.body);
    console.log("-----------------------------");
    const {
      product_name,
      product_brand,
      product_inStock,
      product_price,
      product_description,
      product_category,
      product_material,
      product_mechanism,
      product_water_resistance,
      product_case_diameter,
      product_band_material,
      product_dial_design,
      product_warranty,
    } = req.body;
    // Cập nhật các field nếu có
    if (product_name) product.product_name = product_name;
    if (product_brand) product.product_brand = product_brand;
    if (product_description) product.product_description = product_description;
    if (product_category) product.product_category = product_category;
    if (product_material) product.product_material = product_material;
    if (product_mechanism) product.product_mechanism = product_mechanism;
    if (product_water_resistance) product.product_water_resistance = product_water_resistance;
    if (product_band_material) product.product_band_material = product_band_material;
    if (product_dial_design) product.product_dial_design = product_dial_design;
    if (product_warranty) product.product_warranty = product_warranty;
    // Kiểu số
    if (product_inStock) product.product_inStock = Number(product_inStock);
    if (product_price) product.product_price = Number(product_price);
    if (product_case_diameter) product.product_case_diameter = Number(product_case_diameter);
    // Nếu có thumbnail mới
    if (files?.product_thumbnail?.[0]) {
      // Xóa thumbnail cũ
      if (product.product_thumbnail?.public_id) {
        await cloudinary.uploader.destroy(product.product_thumbnail.public_id);
      }
      const newThumb = files.product_thumbnail[0];
      product.product_thumbnail = {
        url: newThumb.path,
        public_id: newThumb.filename,
      };
    }
    if (files?.product_images?.length > 0) {
      if (product.product_images && product.product_images.length > 0) {
        for (const img of product.product_images) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
      product.product_images = files.product_images.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
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
    // Tìm và xoá sản phẩm
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    if (product.product_thumbnail?.public_id) {
      await cloudinary.uploader.destroy(product.product_thumbnail.public_id);
    }
      if (Array.isArray(product.product_images)) {
      for (const image of product.product_images) {
        if (image?.public_id) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
    }
  
    return product;
  };
  

const  getBrandService = async () => {
    const branches = await productModel.distinct('product_brand');  // Lấy các chi nhánh duy nhất
    return branches
}

const getCategoriesService = async () =>{
    const categories = await productModel.distinct('product_category');  // Lấy các danh mục duy nhất
    return categories
}


const getAllProductService = async (req) => {
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
};

const getProductService = async (value) => { 
      const partern =  /^[0-9a-fA-F]{24}$/ //regex for mongodb id
      let product; 
      if(partern.test(value)) {
        product = await productModel.findById(value)
      }
      else{
        product = await productModel.findOne({slug: value})
      }
      if(!product) throw new NotFoundError("Product not found");
      return product
}

module.exports = { createProductService,
                   deleteProductService,
                   getAllProductService, 
                   getCategoriesService,
                   getProductService,
                   updateProductService,
                   getBrandService};
