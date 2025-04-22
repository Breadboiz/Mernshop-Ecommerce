'use strict'

const { model } = require('mongoose');
const { SuccessResponse } = require('../core/success.response');
const { getUserService,getUserByID, updateUserstatus ,updateUserInfo,getAllUserService } = require('../services/user.services');

const findUserByID = async ()=>{
    const Id = req.params.id 
    return new SuccessResponse({
        message:  `found user ${Id}`,
        metadata: await getUserByID(Id)
    }).send(res)
}

const updateUser= async (req,res) => {
    console.log(req.user);
    const id = req.user.id;
    
   return new SuccessResponse({
       message: "Cập nhật thông tin người dùng thành công",
       metadata: await updateUserInfo({id,data:req.body})
   }).send(res);
 }   

const findAllUser = async (req, res)=>{
    return new SuccessResponse({
        message: "found all user",
        metadata: await getAllUserService()
    }).send(res)
}
const changeUserStatus = async(req, res)=>{
    return new SuccessResponse({
        message: "Changed user status",
        metadata: await updateUserstatus()
    })
}
module.exports = {
    updateUser,
    findAllUser,
    changeUserStatus,
    findUserByID
} 