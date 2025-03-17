'use strict'
const {StatusCodes, ReasonPhrases} = require("../utils/httpStatusCode");

class SuccessResponse {
    constructor({message , statusCode = StatusCodes.OK, metadata = {}}) {
        this.message = message || ReasonPhrases.OK;
        this.status = statusCode;
        this.metadata = metadata;
    }
    send (res, header){
        return res.status(this.status).json(this)
    }
}

class CREATED extends SuccessResponse {
    constructor ({message, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED, metadata}) {
      super({message,statusCode,ReasonPhrases, metadata})
    }
}
class OK extends SuccessResponse {
    constructor({message, metadata}) {
        super({message, metadata});
    }
}
module.exports = {
    SuccessResponse,
    CREATED,
    OK
}