const Proveedor = require("../models/proveedores");

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
            id,
            nombre,
            telefono,
            direccion,
            estado
        } = request.body;

        const newSupplier = await Proveedor.create({
            id,
            nombre,
            telefono,
            direccion,
            estado
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

        const supplierDelete = await Proveedor.findByPk(id);
        if(!supplierDelete){
            return response.status(404).json({message: "No se encontro el proveedor."});
        }

        await supplierDelete.destroy();
        response.json({message: "Proveedor eliminado con exito."});
    }catch(error){
        response.status(500).json({error: error.message});
    }
}