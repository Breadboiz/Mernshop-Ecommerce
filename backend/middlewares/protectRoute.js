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
        const accessToken = authHeader ||  authHeader.split(' ')[1];
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
   if(req.cookies.refreshToken){
    try {
        const refreshToken = req.cookies.refreshToken
    const decodedUser =  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    if( userID !== decodedUser.id) throw new AuthFailedError("Refresh token expired or invalid");
    req.keyStore = keyStore
    req.user = decodedUser
    req.refreshToken = refreshToken
    return next()
    } catch (error) {
        throw error
    }
   } 

    next();
}
const adminRoutes = (req, res, next) =>{
    if(req.user && req.user.roles === 'AD'){
        next();
    }
    else{
        throw new AuthFailedError('Access denied - Admin only');
    }
}

module.exports = {
    protectRoutes,
    adminRoutes
}