'use strict'
const jwt = require('jsonwebtoken');
const { AuthFailedError } = require('../core/error.response');

const generateTokens = (payload) => {
   try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
    if(!accessToken || !refreshToken) throw new AuthFailedError('Failed to generate tokens');
    return {accessToken, refreshToken};
   } catch (error) {
    throw new Error(error);    
   }
}

module.exports = generateTokens    