'use strict'
const {Schema, model} = require('mongoose');

const DOCUMENT_NAME = 'keyToken';
const COLLECTION_NAME = 'keyTokens';

const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    refreshtokenUsed:{
        type: Array, default: [] //lưu refreshToke đã được sử dụng
       },
    refreshToken:{
        type: String, require: true
       }
},{ 
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema);