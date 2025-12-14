const { factura, DetalleVenta, producto, cai: Cai } = require("../models");
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
  { name: "fecha_emision", type: "string" },
  { name: "observaciones", type: "string" },
];


exports.addFactura = async (req, res) => {
  try {

    // ahora busca el ultimo numero del cai disponible
    const caiDisponible = await Cai.findOne({
      where: { estado: "activo" },
      order: [["id", "ASC"]],
    });

    if (!caiDisponible) {
      return res.status(400).json({
        status: "Error",
        message: "No hay CAI disponible para emitir la factura.",
      });
    }

    // ahora busca el ultimo numero de factura con ese cai
    const ultimaFactura = await factura.findOne({
      where: { cai_id: caiDisponible.id },
      order: [["id", "DESC"]],
    });

    let siguienteNumero;
    if (!ultimaFactura) {
      siguienteNumero = caiDisponible.rango_inicial;
    } else {
      const ultimo = parseInt(
        ultimaFactura.numero_factura.split("-").pop()
      );
      siguienteNumero = String(ultimo + 1).padStart(6, "0");
    }

    const numeroFactura = `F-${caiDisponible.codigo_cai}-${siguienteNumero}`;

    // validacion de fecha
    const fechaE = new Date(req.body.fecha_emision);
    if (isNaN(fechaE.getTime())) {
      return res.status(400).json({
        status: "Error",
        message: "El campo fecha_emision tiene que ser una fecha válida",
      });
    }

    //se edita para como se estan consiguiendo los datos del cai, numero de factura y cosas del emisor
    const addF = await factura.create({
      cai_id: caiDisponible.id,
      numero_factura: numeroFactura,

      // cosas que siempre seran la mismas (datos del emisor)
      rtn_emisor: "000000000000",
      nombre_emisor: "DeTodito Market",
      direccion_emisor: "Yoro, Yoro",
      telefono_emisor: "9999-9999",
      correo_emisor: "test@detodito.com",

      nombre_cliente: req.body.nombre_cliente,
      rtn_cliente: req.body.rtn_cliente,

      metodo_pago: req.body.metodo_pago,
      subtotal: req.body.subtotal,
      impuestos: req.body.impuestos || 0,
      total: req.body.total,

      fecha_emision: fechaE,
      observaciones: req.body.observaciones || "",
      estado: "VIGENTE",
    });


    return res.status(201).json({
      status: "Success",
      message: addF,
    });

  } catch (err) {
    console.error(err);

    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        status: "Error",
        message: "El CAI no existe",
      });
    }

    return res.status(500).json({
      status: "Error",
      message: "Hubo un error creando la factura",
      error: err.message,
    });
  }
};


//SE EDITO PARA ACOMODAR LA ASOCIACION
exports.getFactura = async (req, res) => {
  try {
const allFactura = await factura.findAll({
  include: [
    {
      model: DetalleVenta,
      as: "detalle",
      include: [
        {
          model: producto,
          as: "producto",
          attributes: ["nombre"],
        },
      ],
    },
  ],
  order: [["id", "ASC"]],
});


    if (!allFactura || allFactura.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No se encontraron Facturas",
        data: [],
      });
    }

    return res.status(200).json({
      status: "Success",
      message: allFactura,
    });
  } catch (err) {
    console.error("Error fetching facturas:", err);
    return res.status(500).json({
      status: "Error",
      message: "Error al obtener Facturas",
      error: err.message,
    });
  }
};

exports.editFactura = async (req, res) => {
  const { id } = req.params;

  try {
    validateFields(arrFields, req.body, res);

    const { fecha_emision } = req.body;

    const fechaE = new Date(fecha_emision);

    if (!fecha_emision || isNaN(fechaE.getTime())) {
      return res.status(400).json({
        status: "Error",
        message: "El campo fecha_emision tiene que ser una fecha válida (YYYY-MM-DD)",
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
  const { numero_factura } = req.params;

  try {
    const fac = await factura.findOne({
      where: { numero_factura },
    });

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