'use strict'


//const mongoose = require('mongoose'); // Erase if already required
const { model, Schema, Types } = require("mongoose");  
const DOCUMENT_NAME = 'user';
const COLLECTION_NAME = 'users';

// Declare the Schema of the Mongo model
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim: true,
        maxLength: 50
    },
    email:{
        type:String,
        required:true,
        trim: true,
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type: String,
        enums: ['CUST', 'AD'],
        default: 'CUST'
    },
    status: {
        type: String,
        enums: ['active', 'inactive'],
        default: 'active'
    },
    profilePic:{
        type: String,
        default:""
    },
    address: {
        type: String,
        default:""
    },
    phone: {
        type: String,
        default:""
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema); //Usermodel