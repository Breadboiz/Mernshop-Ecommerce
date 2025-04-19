const {Types} = require("mongoose");

exports.convertToMongodbObj = (id) => {
    return Types.ObjectId(id);
}