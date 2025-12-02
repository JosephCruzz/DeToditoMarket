const { DetalleVenta } = require("../models");

exports.addDetalleVenta = async (req, res) => {
  const arrFields = [
    { name: "factura_id", type: "number" },
    { name: "producto_id", type: "number" },
    { name: "cantidad", type: "number" },
    { name: "precio_unitario", type: "number" },
    { name: "descuento", type: "number" },
    { name: "total_linea", type: "number" },
    { name: "metodo_pago", type: "string" },
    { name: "observaciones", type: "string" },
  ];

  try {
    console.log(typeof req.body["descuento"]);

    for (const fields of arrFields) {
      if (typeof req.body[fields.name] !== fields.type) {
        return res.status(400).json({
          status: "Error",
          message: fields.name + " tiene que ser de tipo " + fields.type,
        });
      }

      if (!req.body[fields.name] && req.body[fields.name] !== 0) {
        return res.status(400).json({
          status: "Error",
          message: "El campo " + fields.name + " no puede estar vacio",
        });
      }
    }

    const addDV = await DetalleVenta.create(req.body);

    return res.status(201).json({
      status: "Success",
      message: addDV,
    });
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        status: "Error",
        message:
          "numero de factura y/o numero de numero de producto no es existente.",
      });
    }
    return res.status(500).json({
      status: "Error",
      message: err.name,
    });
  }
};
