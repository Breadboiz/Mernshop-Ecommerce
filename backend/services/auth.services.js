'use strict'
const userModel = require("../models/user.model");
const {ErrorResponse,AuthFailedError,BadRequestError, NotFoundError} = require("../core/error.response");
const brcrypt = require("bcryptjs");
const generateTokens = require("../utils/generateTokens");
const { createKeyToken } = require("./keyTokens.services");
const keyTokenModel = require("../models/keyToken.models");

// const roles = {
//     customer: "CUST",
//     admin: "AD"
// }

const registerService = async ({username, email, password, confirmPassword},res) =>{
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
    const tokens =  generateTokens({id:newuser._id,email: user.email ,role: newuser.roles});
    await createKeyToken({userID: newuser._id, refreshToken: tokens.refreshToken});
    res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,  
            secure: process.env.NODE_ENV !== "dev" ,   
            sameSite: 'Strict', // Ngăn chặn CSRF
        });
    res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,  
            secure: process.env.NODE_ENV !== "dev" ,   
            sameSite: 'Strict', // Ngăn chặn CSRF
        });
    await newuser.save();
    return {
        newuser
    }
   }
                                    
}
const loginService = async ({email, password},res) => {
    if(!email || !password) throw new BadRequestError("Missing email or password");
    const user = await userModel.findOne({email}).lean().exec();
    if(!user){
        throw new NotFoundError("User not found");
    }
    const match = brcrypt.compareSync(password, user.password);
    if(!match){
        throw new AuthFailedError("Invalid password");
    }
    const tokens = generateTokens({id:user._id, email: user.email ,role: user.roles});
    await createKeyToken({userID: user._id, refreshToken: tokens.refreshToken});
    res.cookie('accessToken', tokens.accessToken, {
            httpOnly: true,  
            secure: process.env.NODE_ENV !== "dev" ,   
            sameSite: 'Strict', // Ngăn chặn CSRF
        });
    res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,  
            secure: process.env.NODE_ENV !== "dev" ,   
            sameSite: 'Strict', // Ngăn chặn CSRF
        });
    return {
        user,
    }
}
const logoutService = async (keyStore, res) => {
    const delKey = await keyTokenModel.deleteOne({user: keyStore.user});
    res.clearCookie('accessToken');
    return delKey
}
const handleRefreshToken = async ({user,keyStore ,refreshToken},res) => {
    const {id, email} = user;
    if(keyStore.refreshtokenUsed.includes(refreshToken)){
        await keyTokenModel.deleteOne({user: id});
        throw new AuthFailedError('Refresh token used');
    }
    if(refreshToken !== keyStore.refreshToken) throw new AuthFailedError("Invalid refresh token");
    const foundUser = await userModel.findById(id).lean().exec();
    if(!foundUser) throw new AuthFailedError("User not found");
    const tokens  = generateTokens({id, email, role: foundUser.roles});
    if (!tokens?.refreshToken || !refreshToken) {
        throw new Error("refreshToken is undefined");
      }
    await keyTokenModel.updateOne({user: id}, {
        $set: { refreshToken: tokens.refreshToken },
        $addToSet: { refreshtokenUsed: refreshToken }
    });
    res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,  
        secure: process.env.NODE_ENV !== "dev" ,   
        sameSite: 'Strict', // Ngăn chặn CSRF
    });
    res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,  
        secure: process.env.NODE_ENV !== "dev" ,   
        sameSite: 'Strict', // Ngăn chặn CSRF
    });
    return tokens
}


module.exports = {
    registerService,
    loginService,
    logoutService,
    handleRefreshToken
}