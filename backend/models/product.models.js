'use strict'
const {Schema, model} = require('mongoose');
const slugify = require('slugify');
const removeVietnameseTones = require('../utils/removeVietnameseTone');

const DOCUMENT_NAME = 'product';
const COLLECTION_NAME = 'products';


const productSchema = new Schema({
    product_name: {
      type: String,
      required: true,
      unique: true
    },
    product_brand: {
      type: String,
      required: true
    },
    product_inStock: {
      type: Number,
      required: true,
      min: 0
    },
    product_sold: {
      type: Number,
      default: 0,
      min: 0
    },
    product_price: {
      type: Number,
      required: true,
      min: 0
    },
    product_description: {
      type: String
    },
    product_thumbnail: {
      url: { type: String },
      public_id: { type: String }
    },
    product_images: [{
      url: { type: String },
      public_id: { type: String }
    }],
    product_category: {
      type: String,
      enum: ['nam', 'nữ', 'đôi'],
      required: true
    },
    product_material: {
      type: String // Ví dụ: "thép không gỉ", "da", "nhựa"
    },
    product_mechanism: {
      type: String,
      enum: ['automatic', 'quartz', 'digital', 'smartwatch'] // Cơ, pin, điện tử, thông minh
    },
    product_water_resistance: {
      type: String // Ví dụ: "3ATM", "5ATM", "10ATM"
    },
    product_case_diameter: {
      type: Number // mm
    },
    product_band_material: {
      type: String // Ví dụ: "thép", "da", "silicone"
    },
    product_dial_design:{
      type: String
    },
    product_warranty: {
      type: String // Ví dụ: "2 năm", "12 tháng"
    },
    // product_variants: [
    //   {
    //     variant_name: { type: String },
    //     options: [
    //       {
    //         name: { type: String },
    //         price: { type: Number },
    //         inStock: { type: Number, default: 0 },
    //         thumbnail: {
    //           url: { type: String },
    //           public_id: { type: String }
    //         }
    //       }
    //     ]
    //   }
    // ],
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating must be at most 5'],
      default: 0,
      set: value => (Math.round(value * 10) / 10)
    },
    slug: String
  }, {
    collection: COLLECTION_NAME,
    timestamps: true
  });

  productSchema.index({ 
    product_name: 'text', 
    product_description: 'text' 
  });
productSchema.pre('save', function(next) {
   this.slug = slugify(removeVietnameseTones(this.product_name), { lower: true });
   next();
});
productSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.product_name) {
        update.slug = slugify(removeVietnameseTones(update.product_name), { lower: true });
        this.setUpdate(update);
    }
    next();
});
module.exports = model(DOCUMENT_NAME, productSchema);



//const productSchema = new Schema({
    //     product_name: {
    //         type: String,
    //         required: true,
    //         unique: true
    //     },
    //     product_brand:{
    //         type: String,
    //         required: true
    //     }
    //     ,
    //     product_inStock: {
    //         type: Number,
    //         required: true,
    //         min: 0
    //     },
    //     product_sold: {
    //         type: Number,
    //         default: 0,
    //         min: 0
    //       }
    //     ,
    //     product_price: {
    //         type: Number,
    //         required: true,
    //         min: 0
    //     },
    //     product_description: {
    //         type: String,
    //         //required: true
    //     },
    //     product_thumbnail: {
    //         url: { type: String },
    //         public_id: { type: String }
    //     },
    //     product_image: [{
    //         url: { type: String },
    //         public_id: { type: String }
    //     }],
    //     product_category: {
    //         type: String,
    //         enums: ['nam', 'nữ','đôi'],
    //         required: true
    //     },
    //     rating: {
    //         type: Number,
    //         min: [0, 'Rating must be atleast 0'],
    //         max: [5, 'Rating must be atmost 5'],
    //         default: 0,
    //         set: value => (Math.round(value)*10)/10 
    //     },
    //     slug: String
    // },
    // {
    //     collection: COLLECTION_NAME,
    //     timestamps: true
    // }); 