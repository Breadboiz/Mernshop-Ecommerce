'use strict';

const {Schema, model} = require('mongoose');

const DOCUMENT_NAME = 'discount';
const COLLECTION_NAME = 'discounts';

const discountSchema = new Schema({
    discount_name: {
        type: String,
        required: true
    },
    discount_code: {
        type: String,
        required: true,
        unique: true
    },
    discount_value: {
        type: Number,
        required: true,
        min: 0,
    },
    discount_type: {
        type: String,
        default: 'fixed_amount' // fixed_amount, percentage
    },
    discount_description: {
        type: String
    },
    discount_start: {
        type: Date,
        required: true
    },
    discount_end: {
        type: Date,
        required: true
    },
    discount_max_use: { //num of times discount can be used
        type: Number,
        default: 0
    },
    discount_used: {  // number of discount used
        type: Number,
        default: 0
    },
    discount_users_used: { //whose discount is used
        type: Array,
        default: []
    },
    discount_per_user: {
        type: Number,
        default: 0
    },
    discount_min_order: {
        type: Number,
        required: true
    },
    discount_status: { 
        type: Boolean,
        default: true
    },
    discount_apply_to: {
        type: String,
        enum: ['all', 'product'],
        default: 'all'
    },
    disount_products_ids: {
        type: Array,
        default: []
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME
})
module.exports = model(DOCUMENT_NAME, discountSchema);