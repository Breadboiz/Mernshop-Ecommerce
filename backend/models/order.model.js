const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  order_username: String,
  order_phone: String,
  order_shipping: {
    street: String,
    ward: String,
    district: String,
    city: String,
    country: String
  },
  order_payment: {
    paymentMethod: { type: String, enum: ['cod', 'banking'] },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' }
  },
  order_checkout: {
    totalPrice: Number,
    totalApplyDiscount: Number,
    shippingFee: Number
  },
  order_products: [
    {
      productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      product_name: String,
      price: Number,
      quantity: Number,
      rawPrice: Number,
      product_thumbnail: {
        url: String,
        public_id: String
      }
    }
  ],
  order_status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  cancel_order: { 
    reason: { type: String, default: 'Khách hàng hủy đơn hàng' },
    by: { type: String,  default: 'Khách hàng' },
   },  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
