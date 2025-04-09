'use strict'
const jwt = require('jsonwebtoken');
const keyTokenModels = require('../models/keyToken.models');
const { AuthFailedError } = require('../core/error.response');

const protectRoutes = async (req, res, next) => {
    const userID = req.headers['x-client-id']
    const keyStore = await keyTokenModels.findOne({user: userID}).lean().exec();
    if(!keyStore) throw new AuthFailedError('Invalid user 1');

    const authHeader = req.cookies.accessToken;
    if(authHeader){
        const accessToken = authHeader
    if (accessToken)     {
        try{
        const decodedUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if(decodedUser.id !== userID) throw new AuthFailedError('Invalid user 3');
        req.keyStore = keyStore;
        req.user =  decodedUser
        }catch(err){
            throw new AuthFailedError('AccessToken expired or invalid');
        }
    }
    }
     //if req has refreshtoken (only happen if accessToken exprise)
  

    next();
}

const protectRefreshToken = async (req,res,next) =>{
    const userID = req.headers['x-client-id']
    const keyStore = await keyTokenModels.findOne({user: userID}).lean().exec();
    if(!keyStore) throw new AuthFailedError('Invalid user when refresh token');
    if(req.cookies.refreshToken){
        try {
            const refreshToken = req.cookies.refreshToken
        const decodedUser =  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if( userID !== decodedUser.id) throw new AuthFailedError("Refresh token expired or invalid! please login again");
        req.keyStore = keyStore
        req.user = decodedUser
        req.refreshToken = refreshToken
        return next()
        } catch (error) {
            throw error
        }
       } 
       next()
}

const adminRoutes = async (req, res, next) =>{
    // console.log(req.user);
    if(!req.user || !req.user.role === 'AD'){
        throw new AuthFailedError('Access denied - Admin only');
    }
    next()
}

module.exports = {
    protectRoutes,
    protectRefreshToken,
    adminRoutes
}