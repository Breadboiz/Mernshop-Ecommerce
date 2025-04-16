const inventoryModel = require("../models/inventory.model");

const insertInventory = async ({inventory_product_id,inventory_location = 'unknown',inventory_stock,inventory_reservation = []}) => {
    return await inventoryModel.create({
        inventory_product_id,
        inventory_location,
        inventory_stock,
        inventory_reservation 
    })
}

module.exports = {
    insertInventory
}