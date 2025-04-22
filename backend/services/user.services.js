'use strict'

const userModel = require("../models/user.model");
const { ErrorResponse, NotFoundError } = require("../core/error.response");
const orderModel = require("../models/order.model");


const getUserByID = async (id) => {
    const user = await userModel.findById(id)
    if(!user) throw new NotFoundError(`user ${id} not found`)
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

const getAllUserService = async () => {
    const users = await userModel.find({}).select('-password').lean();
    const userWithOrderCounts = await Promise.all(
      users.map(async (user) => {
        const countOrder = await orderModel.countDocuments({ order_user_id: user._id });
        return {
          ...user,
          countOrder,
        };
      })
    );
    return userWithOrderCounts;
  };
  

const updateUserstatus = async ({id, status}) => {
    const user = await userModel.findById(id);
    if(!user) {
        throw new ErrorResponse("User not found", 404);
    }
    user.status = !user.status;
    await user.save();
    return user;
}

module.exports = {
    getAllUserService,
    getUserByID,
    updateUserInfo,
    updateUserstatus
}