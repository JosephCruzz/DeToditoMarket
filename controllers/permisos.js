const db = require("../models");
const Permiso = db.permisos;

// POST: crear permiso
exports.addPermiso = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
            return res.status(400).json({
                message: "El campo 'nombre' es obligatorio y debe ser un string no vacío",
            });
        }

        const existe = await Permiso.findOne({ where: { nombre: nombre.trim() } });
        if (existe) {
            return res.status(400).json({
                message: `Ya existe un permiso con el nombre '${nombre}'`,
            });
        }

        const permiso = await Permiso.create({
            nombre: nombre.trim(),
            descripcion: descripcion ? descripcion.trim() : null,
        });

        res.status(201).json({
            message: "Permiso creado exitosamente",
            permiso,
        });
    } catch (err) {

        res.status(500).json({
            message: "Error al crear el permiso",
            error: err.message,
        });
    }
};