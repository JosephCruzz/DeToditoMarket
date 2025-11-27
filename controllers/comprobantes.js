const db = require("../models");
const Comprobante = db.comprobantes;

// POST: crear comprobante
exports.addComprobante = async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({ message: "El cuerpo de la solicitud está vacío" });
    }

    const {
      factura_id,
      caja_id,
      tipo,
      numero_referencia,
      monto,
      observaciones
    } = req.body;


    if (!tipo || typeof tipo !== "string" || tipo.trim() === "") {
      return res.status(400).json({
        message: "El campo 'tipo' es obligatorio y debe ser un string no vacío"
      });
    }

    const tiposValidos = ["efectivo", "transferencia"];
    if (!tiposValidos.includes(tipo.toLowerCase())) {
      return res.status(400).json({
        message: "El campo 'tipo' solo acepta 'efectivo' o 'transferencia'"
      });
    }

    const comprobante = await Comprobante.create({
      factura_id,
      caja_id,
      tipo: tipo.toLowerCase(),
      numero_referencia,
      monto,
      observaciones
    });

    res.status(201).json({
      message: "Comprobante creado exitosamente",
      comprobante
    });
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        message: "Factura o caja no válida"
      });
    }

    res.status(500).json({
      message: "Error al crear comprobante",
      error: err.message
    });
  }
};