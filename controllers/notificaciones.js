const db = require("../models");
const Notification = db.notificaciones;

// POST addNotification
exports.addNotification = async (req, res) => {
  try {
    const { user_id, tipo, titulo, mensaje, estado, prioridad } = req.body;

    // Validacion: revisa si dieron el user_id
    if (!user_id) {
      return res.status(400).json({
        message: "El campo user_id es obligatorio",
      });
    }

    // Crear notificación
    const notification = await Notification.create({
      user_id,
      tipo,
      titulo,
      mensaje,
      estado: estado || "no_leida",
      prioridad: prioridad || "media",
    });

    res.status(201).json({
      message: "Notification created successfully",
      notification,
    });
  } catch (err) {
    // Error: clave foranea
    if (err.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        message: "El user_id no existe en la tabla users",
      });
    }

    // Otros errores desconocidos
    res.status(500).json({
      message: "Hubo un error al crear la notificación",
      error: err.message,
    });
  }
};
