const { detalleCompra } = require("../models");

exports.addDetalleCompra = async (req, res) => {
  const { producto_id, compra_id, cantidad, precio_unitario } = req.body;

  if (
    producto_id == null ||
    compra_id == null ||
    cantidad == null ||
    precio_unitario == null
  ) {
    return res.status(400).json({
      message:
        "Sus campos estan vacios o son inexistentes ninguno puede estar asi",
    });
  }

  let cantidad1 = Number(cantidad);
  let precio_unitario1 = Number(precio_unitario);

  if (Number.isNaN(cantidad1) || Number.isNaN(precio_unitario1)) {
    return res.status(400).json({
      message: "Los campos cantidad y precio_unitario tienen que ser numericos",
    });
  }

  if (!Number.isInteger(cantidad1)) {
    return res.status(400).json({
      message: "El campo cantidad tiene que ser entero",
    });
  }

  if (cantidad1 <= 0 || precio_unitario1 <= 0) {
    return res.status(400).json({
      message:
        "Los campos cantidad y precio unitario tienen que ser mayores o iguales a 1",
    });
  }

  try {
    const addDetalleC = await detalleCompra.create({
      producto_id,
      compra_id,
      cantidad,
      precio_unitario,
    });

    return res.status(201).json(addDetalleC);
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        message:
          "Las llaves foraneas producto_id o compra_id no son existentes en su propia tabla respectiva",
      });
    }
    return res.status(500).json({
      message: "Hubo un error al realizar el detalle de la compra",
      error: err.message,
    });
  }
};
