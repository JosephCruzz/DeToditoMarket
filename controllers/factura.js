const { factura } = require("../models");
const validateFields = require("../utils/fieldChecks");

// al cambiar cambiar variable date revisar endpoints
const arrFields = [
  { name: "cai_id", type: "number" },
  { name: "rtn_emisor", type: "string" },
  { name: "nombre_emisor", type: "string" },
  { name: "direccion_emisor", type: "string" },
  { name: "telefono_emisor", type: "string" },
  { name: "correo_emisor", type: "string" },
  { name: "nombre_cliente", type: "string" },
  { name: "rtn_cliente", type: "string" },
  { name: "direccion_cliente", type: "string" },
  { name: "telefono_cliente", type: "string" },
  { name: "numero_factura", type: "string" },
  { name: "metodo_pago", type: "string" },
  { name: "moneda", type: "string" },
  { name: "subtotal", type: "number" },
  { name: "impuestos", type: "number" },
  { name: "total", type: "number" },
  { name: "fecha_emision", type: "string" }, // or Date
  { name: "observaciones", type: "string" },
];
exports.addFactura = async (req, res) => {
  /*
  const {
    cai_id,
    rtn_emisor,
    nombre_emisor,
    direccion_emisor,
    telefono_emisor,
    correo_emisor,
    nombre_cliente,
    rtn_cliente,
    direccion_cliente,
    telefono_cliente,
    numero_factura,
    metodo_pago,
    moneda,
    subtotal,
    impuestos,
    total,
    fecha_emision,
    observaciones,
  } = req.body;*/

  validateFields(arrFields, req.body, res);

  const facturaesRepetida = await factura.findOne({
    where: { numero_factura: req.body["numero_factura"] },
  });

  if (facturaesRepetida) {
    return res.status(400).json({
      status: "Error",
      message: "El numero de factura tiene que ser único.",
    });
  }

  const fechaE = new Date(req.body[arrFields[16].name]);

  if (isNaN(fechaE.getTime())) {
    return res.status(400).json({
      status: "Error",
      message: "El campo tiene que ser una fecha",
    });
  }

  //addF es como decir addFactura es una abreviacion
  try {
    const addF = await factura.create(req.body);
    return res.status(201).json({
      status: "Success",
      message: addF,
    });
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        status: "Error",
        message: "El numero de Cai no es existente",
      });
    }
    return res.status(500).json({
      status: "Error",
      message: "Hubo un error creando la factura",
      error: err.name,
    });
  }
};

exports.getFactura = async (req, res) => {
  try {
    const allFactura = await factura.findAll({
      order: [["id", "ASC"]],
    });

    if (allFactura.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontraron Facturas",
      });
    }
    return res.status(200).json({
      status: "Success",
      message: allFactura,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

exports.editFactura = async (req, res) => {
  const { id } = req.params;

  try {
    validateFields(arrFields, req.body, res);

    const fechEm = new Date(req.body[arrFields[16].name]);

    if (isNaN(fechEm.getTime())) {
      return res.status(400).json({
        status: "Error",
        message: "La fecha está incorrecta tiene que ser formato YYYY-MM-DD",
      });
    }

    const findPk = await factura.findByPk(id);

    if (!findPk) {
      return res.status(400).json({
        status: "Error",
        message: "Esta factura no es existente.",
      });
    }

    const updateF = await factura.update(req.body, {
      where: { id },
      returning: true,
    });

    return res.status(200).json({
      status: "Success",
      message: updateF,
    });
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        status: "Error",
        message: "El numero de cai es inválido.",
      });
    }

    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: "Error",
        message: "El numero de factura tiene que ser único.",
      });
    }
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

exports.deleteFactura = async (req, res) => {
  const { id } = req.params;

  try {
    const fac = await factura.findByPk(id);
    console.log(id)
    if (!fac) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontró la factura seleccionada",
      });
    }

    if (fac.estado === "ANULADA") {
      return res.status(409).json({
        status: "Error",
        message: "La factura ya se encuentra anulada.",
      });
    }

    await fac.update({ estado: "ANULADA" });

    return res.status(200).json({
      status: "Success",
      message: "La factura ha sido anulada con éxito.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};
