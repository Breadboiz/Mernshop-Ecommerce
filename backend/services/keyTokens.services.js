'use strict'

const keyTokenModel = require("../models/keyToken.model");
const { ErrorResponse } = require("../core/error.response");

const createKeyToken = async ({userID,refreshToken}) => {
    try {
        const filter = {user: userID}, update = {refreshtokenUsed: [], refreshToken
        }, options = {upsert: true, new: true}
        const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)
        return tokens 
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }    
}

module.exports = {
    createKeyToken
};