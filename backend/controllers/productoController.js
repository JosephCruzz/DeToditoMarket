const Producto = require("../models/producto");

exports.getInventory = async (request, response) => {
    try{
        const inventory = await Producto.findAll();
        response.json(inventory);
    }catch(error){
        response.status(500).json({error: error.message});
    }
}