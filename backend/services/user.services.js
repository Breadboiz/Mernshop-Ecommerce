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
    const {address, phone} = data;
    const user = await userModel.findByIdAndUpdate(id, {address, phone}, { new: true });
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        role: user.roles,
        phone: user.phone,
        address: user.address
    }
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