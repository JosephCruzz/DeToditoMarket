const db = require("../models");
const Producto = db.producto;
const Auditoria = db.auditoria;

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
            id_user,
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento
        } = request.body;

        if(!id_user||!nombre||!precio||!stock||!stock_minimo||!fecha_vencimiento){
            return response.status(400).json({message: "Bad Request"});
        }

        const newProduct = await Producto.create({
            nombre,
            precio,
            stock,
            stock_minimo,
            fecha_vencimiento
        });

        await Auditoria.create({
            user_id: id_user,
            producto_id: newProduct.id,
            entrada_salida: "entrada",
            descripcion: `Se agrego ${stock} unidades de ${nombre} al inventario el 
            ${new Date().toLocaleString('es-HN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  })}`
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
            id_user,
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

        if(productEdit.stock > stock){
            const num = productEdit.stock - stock;
            await Auditoria.create({
                user_id: id_user,
                producto_id: productEdit.id,
                entrada_salida: "entrada",
                descripcion: `Se agregaron ${num} unidades de ${nombre} del inventario el 
                ${new Date().toLocaleString('es-HN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    })}`
            });
        }else if(productEdit.stock < stock){
            const num = stock - productEdit.stock;
            await Auditoria.create({
                user_id: id_user,
                producto_id: productEdit.id,
                entrada_salida: "salida",
                descripcion: `Se sacaron ${num} unidades de ${nombre} del inventario el 
                ${new Date().toLocaleString('es-HN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    })}`
            });
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

        const { 
            estado
        } = request.body;

        if(!id||!estado){
            return response.status(400).json({message: "Bad Request"});
        }

        const productDelete = await Producto.findByPk(id);
        if(!productDelete){
            return response.status(404).json({message: "No se encontro el producto."});
        }

        await productDelete.update({
            estado
        });

        response.json({message: "Producto eliminado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}