'use strict'

const userModel = require("../models/user.model");
const { ErrorResponse } = require("../core/error.response");
const orderModel = require("../models/order.model");

const getAllUserService = async () => {
        const users = await userModel.find();
        return users;
}

const getUserByID = async (id) => {
    const user = await userModel.findById(id);
    return user;
}

const updateUserInfo = async ({id, data}) => {
    const {address, phone, email} = data;
    const user = await userModel.findByIdAndUpdate(id, {address, phone, email}, { new: true });
    return user;
}

const updateUserstatus = async ({id, status}) => {
    const user = await userModel.findById(id);
    if(!user) {
        throw new ErrorResponse("User not found", 404);
    }
    user.status = status;
    await user.save();
    return user;
}

module.exports = {
    getAllUserService,
    getUserByID,
    updateUserInfo,
    updateUserstatus
}