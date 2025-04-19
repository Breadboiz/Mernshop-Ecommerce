const {Schema, model} = require('mongoose');
const productModel = require("./product.model");

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
inventorySchema.post('save', async function (doc) {
    try {
      await productModel.findOneAndUpdate(
        { _id: doc.inventory_product_id },
        {
            $set: { product_inStock: doc.inventory_stock },
        },
        { new: true }
      );
    } catch (error) {
      console.error("Lỗi cập nhật product_inStock sau khi tạo inventory:", error);
    }
  });
  
  inventorySchema.post('findOneAndUpdate', async function (doc) {
    if (doc && doc.inventory_product_id) {
      try {
        await productModel.findOneAndUpdate(
          { _id: doc.inventory_product_id },
          {
            $set: { product_inStock: doc.inventory_stock }
          },
          { new: true }
        );
      } catch (error) {
        console.error("Lỗi cập nhật tồn kho trong product:", error);
      }
    }
  });
  

//Export the model
module.exports = model(DOCUMENT_NAME, inventorySchema);
