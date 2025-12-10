const db = require("../models");
const Auditoria = db.auditoria;

// POST: crear auditoria
exports.addAuditoria = async (req, res) => {
    try {
        const { user_id, producto_id, entrada_salida, descripcion } = req.body;

        if (!entrada_salida || typeof entrada_salida !== "string" || entrada_salida.trim() === "") {
            return res.status(400).json({ message: "El campo 'entrada_salida' es obligatorio y debe ser un string" });
        }

        const nuevoRegistro = await Auditoria.create({
            user_id,
            producto_id,
            entrada_salida,
            descripcion
        });

        res.status(201).json({
            message: "Registro de auditoría creado exitosamente",
            auditoria: nuevoRegistro
        });
    } catch (err) {
        if (err.name === "SequelizeForeignKeyConstraintError") {
            return res.status(400).json({ message: "user_id o producto_id no válido" });
        }

        res.status(500).json({
            message: "Error al crear registro de auditoría",
            error: err.message
        });
    }
};