const { compras, detalleCompra, proveedores, producto, users, sequelize } = require("../models");

exports.addCompra = async (req, res) => {
  try {
    const { proveedor_id, user_id, estado } = req.body;

    if (!proveedor_id || !user_id) {
      return res.status(400).json({
        message: "Los campos proveedor_id y user_id son obligatorios",
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

//todas las compras
exports.getCompra = async (req, res) => {
  try {
    const allCompras = await compras.findAll({
      order: [["fecha_creacion", "ASC"]],
      include: [
        { model: require("../models").proveedores, as: "proveedor" },
        { model: require("../models").users, as: "user" }
      ]
    });

    if (allCompras.length === 0) {
      return res.status(404).json({
        message: "No se encontraron compras en la base de datos"
      });
    }
    return res.status(200).json(allCompras);
  } catch (err) {
    console.error("Error en getCompra:", err); // <---- Mira el error completo
    return res.status(500).json({
      message: "No se pudo obtener los datos",
      error: err.message
    });
  }
};
