const db = require("../models");
const Producto = db.producto;

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
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento
        } = request.body;

        if(!nombre||!precio||!stock||!stock_minimo||!fecha_vencimiento){
            return response.status(400).json({message: "Bad Request"});
        }

        const newProduct = await Producto.create({
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento
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
            fecha_vencimiento
        } = request.body;

        if(!id||!nombre||!precio||!stock||!stock_minimo||!fecha_vencimiento){
            return response.status(400).json({message: "Bad Request"});
        }

        const productEdit = await Producto.findByPk(id);
        if(!productEdit){
            return response.status(404).json({message: "No se encontro el producto."});
        }

        await productEdit.update({
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento
        });

        response.json({message: "Producto editado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.deleteFromInventory = async (request, response) => {
    try{
        const { id } = request.params;

        if(!id){
            return response.status(400).json({message: "Bad Request"});
        }

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