const {Schema, model} = require('mongoose');
const DOCUMENT_NAME = 'inventory';
const COLLECTION_NAME = 'inventories';
 

// Declare the Schema of the Mongo model
const inventorySchema = Schema({
    inventory_product_id:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
   inventory_location: {
        type: String,
        required: true,
        default: "unknown"
    },
    inventory_stock: {
        type: Number,
        required: true,
        min: 0
    },
    inventory_reservation:{
        type: Array,
        default: []
    }
},{
    timestamps: true,
    collection: COLLECTION_NAME

});

//Export the model
module.exports = model(DOCUMENT_NAME, inventorySchema);
