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
            nombre,
            telefono,
            direccion,
            estado
        } = request.body;

        const newSupplier = await Proveedor.create({
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