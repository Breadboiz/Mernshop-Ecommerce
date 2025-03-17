'use strict';
const { SuccessResponse, CREATED } = require('../core/success.response');
const {registerService} = require('../services/auth.services');
const register = async (req, res, next) =>{
    //Test 
    return new CREATED({
        message: "Register successfully",
        metadata: await registerService(req.body)
    }).send(res);

    //return res.status(200).json(await registerService(req.body));
}

module.exports = {
    register
}