'use strict'

const {Schema, model} = require('mongoose');
const COLLECTION_NAME = 'carts';
const DOCUMENT_NAME = 'cart';
const cartSchema = new Schema({
    cart_state: {
        type: String,
        enum: ['active', 'failed', 'completed', 'pending'],
        default: 'active'
    },
    cart_user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cart_products: {
       type: Array,
       required: true,
       default: []
    },
    __v : {
        type: Number,
        select: false
    }
},{
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'modifiedOn'
    },
    collection: COLLECTION_NAME
}
)

module.exports = model(DOCUMENT_NAME, cartSchema);