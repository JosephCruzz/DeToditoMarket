const db = require("../models");
const Role = db.roles;

// POST: addRole
exports.addRole = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return res.status(400).json({
        message: "El campo 'nombre' es obligatorio y debe ser un string no vacío",
      });
    }

    const role = await Role.create({ nombre: nombre.trim() });
    res.status(201).json({
      message: "Rol creado exitosamente",
      role,
    });
  } catch (err) {
    // error del foreign key si no es unica
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: `Ya existe un rol con el nombre '${req.body.nombre}'`,
      });
    }

    res.status(500).json({
      message: "Hubo un error al crear el rol",
      error: err.message,
    });
  }
};

// GET: getRole (con ID)
exports.getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) return res.status(404).json({ 
        message: "Rol no encontrado" });
    res.json({ role });
    
  } catch (err) {
    res.status(500).json({ 
        message: "Error al obtener rol", 
        error: err.message });
  }
};

// PUT: actualizar rol
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body) {
      return res.status(400).json({ message: "El cuerpo de la solicitud está vacío" });
    }

    const { nombre } = req.body;

    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ message: "Rol no encontrado" });

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
      return res.status(400).json({
        message: "El campo 'nombre' es obligatorio y debe ser un string no vacío",
      });
    }

    await role.update({ nombre: nombre.trim() });
    res.json({ message: "Rol actualizado exitosamente", role });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: `Ya existe un rol con el nombre '${req.body.nombre}'`,
      });
    }
    res.status(500).json({ message: "Error al actualizar rol", error: err.message });
  }
};

// DELETE: eliminar rol
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) return res.status(404).json({ message: "Rol no encontrado" });

    await role.destroy();
    res.json({ message: "Rol eliminado exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar rol", error: err.message });
  }
};