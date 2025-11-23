const { compras, sequelize } = require("../models");
const detalleCompras = require("../models/detalleCompra");

exports.addCompra = async (req, res) => {
  try {
    const { proveedor_id, user_id, estado } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "El campo user_id tiene que tener valores existentes",
      });
    }
    const newCompra = await compras.create({
      proveedor_id,
      user_id,
      estado: estado || "pendiente",
    });
    res.status(201).json(newCompra);
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        message:
          "El id de foreign key de proveedor_id o user_id no es existente en la base de datos",
      });
    }

    res.status(500).json({
      message: "Hubo un error al crear la compra",
      error: err.message,
    });
  }
};
