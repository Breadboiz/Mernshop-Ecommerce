'use strict'
const { StatusCodes, ReasonPhrases} = require("../utils/httpStatusCode");
class ErrorResponse extends Error {
   constructor(message, status){
    super(message);
    this.status = status;
   }
}
class AuthFailedError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED){
        super(message, status);
    }
}
class BadRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.BAD_REQUEST, status = StatusCodes.BAD_REQUEST){
        super(message, status);
    }
}

module.exports = {
    ErrorResponse,
    AuthFailedError,
    BadRequestError
}