const Producto = require("../models/producto");

exports.getInventory = async (request, response) => {
    try{
        const inventory = await Producto.findAll();
        response.json(inventory);
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.addToInventory = async (request, response) => {
    try{
        const { 
            id,
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento,
            precio_unitario
        } = request.body;

        const newProduct = await Producto.create({
            id,
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento,
            precio_unitario
        });

        response.json(newProduct);
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.editInventory = async (request, response) => {
    try{
        const { id } = request.params;
        const { 
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento,
            precio_unitario
        } = request.body;

        const productEdit = await Producto.findByPk(id);
        if(!productEdit){
            return response.status(404).json({message: "No se encontro el producto."});
        }

        await productEdit.update({
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento,
            precio_unitario
        });

        response.json({message: "Producto editado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.deleteFromInventory = async (request, response) => {
    try{
        const { id } = request.params;

        const productDelete = await Producto.findByPk(id);
        if(!productDelete){
            return response.status(404).json({message: "No se encontro el producto."});
        }

        await productDelete.destroy();

        response.json({message: "Producto eliminado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}