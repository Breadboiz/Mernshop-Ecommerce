'use strict'

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: '/MERNSHOP',
        allowedFormats: ['jpg', 'png','jpeg', 'gif','webp'], 
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
  });
  
module.exports = {
    storage,
    cloudinary
}