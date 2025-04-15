const inventoryModel = require("../models/inventory.model");

const insertInventory = async (inventory_id,
                               inventory_location = 'unknown',
                               inventory_stock,
                               inventory_resavtion) => {
    return await inventoryModel.create({
        inventory_id,
        inventory_location,
        inventory_stock,
        inventory_resavtion
    })
}

module.exports = {
    insertInventory
}