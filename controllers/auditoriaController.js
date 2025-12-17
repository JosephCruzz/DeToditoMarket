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

// GET: obtener todos los registros de auditoria
exports.getAuditorias = async (req, res) => {
    try {
        const registros = await Auditoria.findAll();
        res.status(200).json(registros);
    } catch (err) {
        res.status(500).json({
            message: "Error al obtener registros de auditoría",
            error: err.message
        });
    }
};

// GET: obtener un registro por ID
exports.getAuditoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await Auditoria.findByPk(id);

        if (!registro) {
            return res.status(404).json({ message: "Registro de auditoría no encontrado" });
        }

        res.status(200).json(registro);
    } catch (err) {
        res.status(500).json({
            message: "Error al obtener registro de auditoría",
            error: err.message
        });
    }
};