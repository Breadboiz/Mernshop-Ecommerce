'use strict';
const { SuccessResponse, CREATED, OK } = require('../core/success.response');
const {registerService, loginService, logoutService, handleRefreshToken} = require('../services/auth.services');
const register = async (req, res, next) =>{
    return new CREATED({
        message: "Register successfully",
        metadata: await registerService(req.body,res)
    }).send(res);

    //return res.status(200).json(await registerService(req.body));
}
const login = async (req, res, next) =>{
    return new OK({
        message: "Login successfully",
        metadata: await loginService(req.body, res)
    }).send(res);
}
const logout = async (req, res, next) =>{
    return new OK({
        message: "Logout successfully",
        metadata: await logoutService(req.keyStore, res)
    }).send(res);
}
const refreshToken = async (req, res, next) =>{
    return new OK({
        message: "Refresh token successfully",
        metadata: await handleRefreshToken({
            user: req.user,
            keyStore: req.keyStore,
            refreshToken: req.cookies.refreshToken
        }, res)
    }).send(res)
}
module.exports = {
    register,
    login,
    logout,
    refreshToken
}