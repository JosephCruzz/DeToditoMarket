const compras = require ("../models/compras");
const detalleCompras = require ("../models/detalleCompra");

exports.addCompra = async (req, res) => {
    try {
        const {id, proveedor_id, user_id, estado } = req.body;

        const newCompra = await compras.create({
            id,
            proveedor_id,
            user_id,
            estado
        });

        res.status(201).json(newCompra);

    } catch (err) {
        console.error("Hubo un error al añadir la compra:", err);

        res.status(500).json({
            message: "Hubo un error al crear la compra",
            error: err.message
        });
    }
};