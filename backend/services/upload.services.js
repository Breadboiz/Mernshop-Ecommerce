'use strict'

const cloudinary = require('../config/config.cloudinay');

const uploadFromLocal = async (path, folderName = '/MERNSHOP', product_name)=>{
    try {
        const result = await cloudinary.uploader.upload(path, {
            public_id: product_name+"thumbs"+Date.now(),
            folder: folderName,
        })
        return {
            image: result.secure_url,
            image_url: await cloudinary.url(result.public_id, {
                format: "jpg",
            }
            )
        }
        //return   result.secure_url
} catch(err){
    console.log(err);
}}


module.exports = {
    uploadFromLocal
}