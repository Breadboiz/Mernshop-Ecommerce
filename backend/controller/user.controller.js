'use strict'

const { model } = require('mongoose');
const { SuccessResponse } = require('../core/success.response');
const { getUserService,getUserByID,updateUserstatus,updateUserInfo,getAllUserService } = require('../services/user.services');

const updateUser= async (req,res) => {
    console.log(req.user);
    const id = req.user.id;
    
   return new SuccessResponse({
       message: "Cập nhật thông tin người dùng thành công",
       metadata: await updateUserInfo({id,data:req.body})
   }).send(res);
 }   

module.exports = {
    updateUser
} 