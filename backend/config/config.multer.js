'use strict'

const multer = require('multer');
const path = require('path');

// const uploadMemory = multer({
//     storage: multer.memoryStorage(),

// }) //Luu trên RAM

const uploadDisk = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../uploads"));
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + file.originalname )
        }
    })
})

module.exports = {
    uploadDisk
}