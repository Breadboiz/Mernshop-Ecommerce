const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'orders';
const DOCUMENT_NAME = 'order';

const orderSchema = new Schema({
    order_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    order_checkout: {
        type: Object,
        required: true,
        default: {}
        /*
        order_checkout{
            totalPrice,
            totalApplyDiscount,
            shippingFee, //from checkout serrvice
        }
        */
    },
    order_shipping: {
        type: Object,
        required: true,
        default: {}
        /*
        street,
        ward,
        district,
        city,
        country
        */
    },
    order_payment: {
        type: Object,
        required: true,
        default: {}
        /*
        paymentMethod,
        paymentStatus
        */
    },
    order_products: {
        type: Array,
        required: true,
        default: [] //from checkout service
    },
    order_status: {
        type: String,
        required: true,
        enum: ['pending', 'completed','shiiped','delivered', 'cancelled'],
        default: 'pending'
}},{
    timestamps: true,
    collection: COLLECTION_NAME
})
//Export the model
module.exports = model(DOCUMENT_NAME, orderSchema);