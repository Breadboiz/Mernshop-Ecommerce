'use strict'
const {Schema, model} = require('mongoose');
const slugify = require('slugify');

const DOCUMENT_NAME = 'product';
const COLLECTION_NAME = 'products';

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_branch:{
        type: String,
        required: true
    }
    ,
    product_inStock: {
        type: Number,
        required: true,
        min: 0
    }
    ,
    product_price: {
        type: Number,
        required: true,
        min: 0
    },
    prroduct_description: {
        type: String,
        required: true
    },
    product_image: [{
        type: String,
    }],
    category: {
        type: String,
        enums: ['nam', 'nữ','đôi']
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be atleast 0'],
        max: [5, 'Rating must be atmost 5'],
        default: 0,
        set: value => (Math.round(value)*10)/10 
    },
    slug: String
},
{
    collection: COLLECTION_NAME,
    timestamps: true
}); 
productSchema.pre('save', function(next) {
   this.slug = slugify(this.product_name, { lower: true });
   next();
});

module.exports = model(DOCUMENT_NAME, productSchema);