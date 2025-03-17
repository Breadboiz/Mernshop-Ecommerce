'use strict'
const userModel = require("../models/user.model");
const {ErrorResponse,AuthFailedError,BadRequestError} = require("../core/error.response");
const brcrypt = require("bcryptjs");

const roles = {
    customer: "CUST",
    admin: "AD"
}

const registerService = async ({username, email, password, confirmPassword}) =>{
    if(password !== confirmPassword){
        throw new BadRequestError("Password does not match");
    }
    const userholder = await userModel.findOne({email});
    if(userholder){
       throw new BadRequestError("User already exists");
    }
   else{
    const salt = brcrypt.genSaltSync(10);
    const hashPassword = brcrypt.hashSync(password, salt);
    const newuser = new userModel({ username,
                                    email,
                                    //roles: [roles.customer],
                                    password: hashPassword});
    await newuser.save();
    return {
        newuser
    }
   }
                                    
}

module.exports = {
    registerService
}