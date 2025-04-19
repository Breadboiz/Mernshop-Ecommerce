'use strict';

const discountModel = require("../models/discount.model");

const createDiscountService = async ( payload) => {
    const createDiscount = async (payload) => {
  
            const { discount_code, discount_value, discount_start, discount_end, discount_min_order } = payload;
    
            if (!discount_code || !discount_value || !discount_start || !discount_end || !discount_min_order) {
                throw new Error('Thiếu thông tin bắt buộc!');
            }
    
            const existingDiscount = await Discount.findOne({ discount_code });
            if (existingDiscount) {
                throw new Error('Mã giảm giá đã tồn tại!');
            }
    
            const newDiscount = new Discount(payload);
            await newDiscount.save();
    
            return newDiscount;
 
    };

}