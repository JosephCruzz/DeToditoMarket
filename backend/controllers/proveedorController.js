const db = require("../models");
const Proveedor = db.proveedores;

exports.getSuppliers = async (request, response) => {
    try{
        const proveedores = await Proveedor.findAll();
        response.json(proveedores);
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.addSupplier = async (request, response) => {
    try{
        const { 
            nombre,
            telefono,
            direccion
        } = request.body;

        if(!nombre||!telefono||!direccion){
            return response.status(400).json({message: "Bad Request"});
        }

        const newSupplier = await Proveedor.create({
            nombre,
            telefono,
            direccion
        });

        response.json(newSupplier);
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.editSupplier = async (request, response) => {
    try{
        const { id } = request.params;
        const { 
            nombre,
            telefono,
            direccion,
            estado
        } = request.body;

        if(!id||!nombre||!telefono||!direccion||!estado){
            return response.status(400).json({message: "Bad Request"});
        }

        const supplierEdit = await Proveedor.findByPk(id);
        if(!supplierEdit){
            return response.status(404).json({message: "No se encontro el proveedor."});
        }

        await supplierEdit.update({
            nombre,
            telefono,
            direccion,
            estado
        });

        response.json({message: "Proveedor editado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}

exports.deleteSupplier = async (request, response) => {
    try{
        const { id } = request.params;

        const { 
            estado
        } = request.body;

        if(!id||!estado){
            return response.status(400).json({message: "Bad Request"});
        }

        const supplierDelete = await Proveedor.findByPk(id);
        if(!supplierDelete){
            return response.status(404).json({message: "No se encontro el proveedor."});
        }

        await supplierDelete.update({
            estado
        });
        response.json({message: "Proveedor eliminado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}