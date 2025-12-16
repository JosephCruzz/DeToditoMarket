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

        if (monto === undefined || monto === null || isNaN(monto) || Number(monto) <= 0) {
            return res.status(400).json({
                message: "El campo 'monto' es obligatorio y debe ser un número mayor que 0"
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

// PUT: editar comprobante
exports.editComprobante = async (req, res) => {
    try {
        const { id } = req.params;

        const comprobante = await Comprobante.findByPk(id);

        if (!comprobante) {
            return res.status(404).json({
                message: "Comprobante no encontrado"
            });
        }

        const {
            factura_id,
            caja_id,
            tipo,
            numero_referencia,
            monto,
            observaciones
        } = req.body;

        if (tipo !== undefined) {
            const tiposValidos = ["efectivo", "transferencia"];
            if (!tiposValidos.includes(tipo.toLowerCase())) {
                return res.status(400).json({
                    message: "El campo 'tipo' solo acepta 'efectivo' o 'transferencia'"
                });
            }
        }

        if (monto !== undefined) {
            if (isNaN(monto) || Number(monto) <= 0) {
                return res.status(400).json({
                    message: "El campo 'monto' debe ser un número mayor que 0"
                });
            }
        }

        await comprobante.update({
            factura_id,
            caja_id,
            tipo: tipo?.toLowerCase(),
            numero_referencia,
            monto,
            observaciones
        });

        return res.status(200).json({
            message: "Comprobante actualizado exitosamente",
            comprobante
        });

    } catch (err) {
        if (err.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({
                message: "Factura o caja no válida"
            });
        }

        return res.status(500).json({
            message: "Error al actualizar comprobante",
            error: err.message
        });
    }
};

// GET: obtener comprobante
exports.getComprobante = async (req, res) => {
    try {
        const { id } = req.params;

        const comprobante = await Comprobante.findByPk(id);

        if (!comprobante) {
            return res.status(404).json({ message: "Comprobante no encontrado" });
        }

        res.status(200).json(comprobante);
    } catch (err) {
        res.status(500).json({
            message: "Error al obtener comprobante",
            error: err.message
        });
    }
};