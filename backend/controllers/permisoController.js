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

// GET: permiso por ID
exports.getPermisoById = async (req, res) => {
  try {
    const { id } = req.params;
    const permiso = await Permiso.findByPk(id);

    if (!permiso)
      return res.status(404).json({ message: "Permiso no encontrado" });

    res.json({ permiso });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener permiso",
      error: err.message,
    });
  }
};

// PUT: actualizar permiso
exports.updatePermiso = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body) {
      return res
        .status(400)
        .json({ message: "El cuerpo de la solicitud está vacío" });
    }

    const { nombre, descripcion } = req.body;

    const permiso = await Permiso.findByPk(id);
    if (!permiso)
      return res.status(404).json({ message: "Permiso no encontrado" });

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return res.status(400).json({
        message: "El campo 'nombre' es obligatorio y debe ser un string no vacío",
      });
    }

    await permiso.update({
      nombre: nombre.trim(),
      descripcion: descripcion ? descripcion.trim() : null,
    });

    res.json({ message: "Permiso actualizado exitosamente", permiso });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar permiso", error: err.message });
  }
};

// DELETE: eliminar permiso
exports.deletePermiso = async (req, res) => {
  try {
    const { id } = req.params;
    const permiso = await Permiso.findByPk(id);

    if (!permiso) return res.status(404).json({ message: "Permiso no encontrado" });

    await permiso.destroy();
    res.json({ message: "Permiso eliminado exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar permiso", error: err.message });
  }
};