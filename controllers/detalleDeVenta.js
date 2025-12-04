const { DetalleVenta } = require("../models");

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
exports.addDetalleVenta = async (req, res) => {
  try {
    for (const fields of arrFields) {
      if (!req.body[fields.name] && req.body[fields.name] !== 0) {
        return res.status(400).json({
          status: "Error",
          message: "El campo " + fields.name + " no puede estar vacio",
        });
      }
      if (typeof req.body[fields.name] !== fields.type) {
        return res.status(400).json({
          status: "Error",
          message: fields.name + " tiene que ser de tipo " + fields.type,
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
      message: err.message,
    });
  }
};

exports.getDetalleVenta = async (req, res) => {
  try {
    const getDetalleV = await DetalleVenta.findAll({
      order: [["fecha", "ASC"]],
    });

    if (getDetalleV.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontro detalles de ventas.",
      });
    }
    res.status(200).json({
      status: "Success",
      message: getDetalleV,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

exports.editDetalleVenta = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        status: "Error",
        message: "Debe ingresar el número de identificación",
      });
    }

    if (!(await DetalleVenta.findByPk(id))) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontró ese número de identificación",
      });
    }

    for (const fields of arrFields) {
      if (!req.body[fields.name] && req.body[fields.name] !== 0) {
        return res.status(400).json({
          status: "Error",
          message: "El campo" + fields.name + " esta vacio",
        });
      }

      if (typeof req.body[fields.name] !== fields.type) {
        return res.status(400).json({
          status: "Error",
          message:
            "El campo " + fields.name + " deberia ser de tipo: " + fields.type,
        });
      }
    }
    const UdetalleVenta = await DetalleVenta.update(req.body, {
      where: {
        id: id,
      },
      returning: true,
    });

    return res.status(200).json({
      status: "Success",
      message: UdetalleVenta[1],
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};
