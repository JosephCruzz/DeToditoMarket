<<<<<<< HEAD
const { compras, detalleCompra, proveedores, producto, users } = require("../models");

// Agregar compra
=======
<<<<<<< HEAD
const { compras, sequelize } = require("../models");

=======
const { compras, detalleCompra, proveedores, producto, users } = require("../models");

// Agregar compra
>>>>>>> develop
>>>>>>> develop
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
<<<<<<< HEAD
      estado: estado || "activo",
    });

=======
<<<<<<< HEAD
      estado: estado || "pendiente",
    });
=======
      estado: estado || "activo",
    });

>>>>>>> develop
>>>>>>> develop
    res.status(201).json(newCompra);
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        message:
          "El id de foreign key de proveedor_id o user_id no es existente en la base de datos",
      });
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> develop
>>>>>>> develop
    res.status(500).json({
      message: "Hubo un error al crear la compra",
      error: err.message,
    });
  }
};

<<<<<<< HEAD
exports.getCompra = async (req, res) => {
=======
<<<<<<< HEAD
//todas las compras
exports.getCompra = async (req,res) => {
  
>>>>>>> develop
  try {
    const allCompras = await compras.findAll({
      order: [["fecha_creacion", "ASC"]],
      include: [
        { model: proveedores, as: "proveedor" },
        { model: users, as: "user" },
        { 
          model: detalleCompra, 
          as: "detalleCompra",
          include: [{ model: producto, as: "producto" }]
        }
      ],
    });
<<<<<<< HEAD

=======
    if(allCompras.length === 0){
    return  res.status(404).json({
        message: "No se encontraron compras en la base de datos"
      })
    }
   return res.status(200).json(allCompras)
  } catch (err) {
   return res.status(500).json({
      message: "No se pudo obtener los datos",
      error: err.message
    })
  }
<<<<<<<< HEAD:backend/controllers/compraController.js
}
========

}
=======
exports.getCompra = async (req, res) => {
  try {
    const allCompras = await compras.findAll({
      order: [["fecha_creacion", "ASC"]],
      include: [
        { model: proveedores, as: "proveedor" },
        { model: users, as: "user" },
        { 
          model: detalleCompra, 
          as: "detalleCompra",
          include: [{ model: producto, as: "producto" }]
        }
      ],
    });

>>>>>>> develop
    if (allCompras.length === 0) {
      return res.status(404).json({
        message: "No se encontraron compras en la base de datos",
      });
    }

    res.status(200).json(allCompras);
  } catch (err) {
    console.error("Error en getCompras:", err);
    res.status(500).json({
      message: "No se pudo obtener los datos",
      error: err.message,
    });
  }
};
<<<<<<< HEAD
=======
>>>>>>> develop
>>>>>>> develop

// Editar compra - solo cambia el estado a "anulado"
exports.editCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!id) {
<<<<<<< HEAD
      return res.status(400).json({ message: "El ID de la compra es obligatorio" });
    }

    if (!estado || estado !== "anulado") {
      return res.status(400).json({ message: "Solo se permite cambiar el estado a 'anulado'" });
=======
<<<<<<< HEAD
      return res.status(400).json({
        message: "El ID de la compra es obligatorio",
      });
    }

    if (!estado || estado !== "anulado") {
      return res.status(400).json({
        message: "Solo se permite cambiar el estado a 'anulado'",
      });
=======
      return res.status(400).json({ message: "El ID de la compra es obligatorio" });
    }

    if (!estado || estado !== "anulado") {
      return res.status(400).json({ message: "Solo se permite cambiar el estado a 'anulado'" });
>>>>>>> develop
>>>>>>> develop
    }

    const compra = await compras.findByPk(id);

    if (!compra) {
<<<<<<< HEAD
      return res.status(404).json({ message: "Compra no encontrada" });
=======
<<<<<<< HEAD
      return res.status(404).json({
        message: "Compra no encontrada",
      });
=======
      return res.status(404).json({ message: "Compra no encontrada" });
>>>>>>> develop
>>>>>>> develop
    }

    await compra.update({ estado: "anulado" });

<<<<<<< HEAD
    res.status(200).json({
=======
<<<<<<< HEAD
    return res.status(200).json({
=======
    res.status(200).json({
>>>>>>> develop
>>>>>>> develop
      message: "Compra anulada exitosamente",
      compra,
    });
  } catch (err) {
<<<<<<< HEAD
    res.status(500).json({
=======
<<<<<<< HEAD
    return res.status(500).json({
=======
    res.status(500).json({
>>>>>>> develop
>>>>>>> develop
      message: "Error al actualizar la compra",
      error: err.message,
    });
  }
};
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>>> develop:controllers/compras.js
=======
>>>>>>> develop
>>>>>>> develop
