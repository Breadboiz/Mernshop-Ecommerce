const inventoryModel = require("../models/inventory.model");
const { convertToMongodbObj } = require("../utils/convertToMongodbObj");

const insertInventory = async ({inventory_product_id,inventory_location = 'unknown',inventory_stock,inventory_reservation = []}) => {
    return await inventoryModel.create({
        inventory_product_id,
        inventory_location,
        inventory_stock,
        inventory_reservation 
    })
}
const reservationInventory = async ({productID, quantity, cartID}) => {
    const query = {
        inventory_product_id: convertToMongodbObj(productID),
        inventory_stock: {$gte: quantity},
    },
    updateSet = {
        $push: {
            inventory_reservation: {
                cartID,
                quantity,
                createdOn: new Date(),
            }
        },
        $inc: {
            inventory_stock: -quantity
        }
    },
    options = {upsert: true, new: true}
    return await inventoryModel.findOneAndUpdate(query, updateSet, options);    
}
const updateInventoryQuantity = async ( productID, req ) => {
    const { quantity } = req.body;
    const query = {
      inventory_product_id: productID
    };
  
    const updateSet = {
      $set: {
        inventory_stock: quantity 
      }
    };
  
    const options = { new: true };
  
    const updatedInventory = await inventoryModel.findOneAndUpdate(query, updateSet, options);
    if (!updatedInventory) {
      throw new Error("Không tìm thấy tồn kho để cập nhật");
    }
    return updatedInventory;
  };
  
module.exports = {
    insertInventory,
    reservationInventory,
    updateInventoryQuantity
}