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
      message: "Notification created successfully.",
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

// GET: getNotification (con ID)
exports.getNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: "La notificacion no existe." });
    }

    res.status(200).json({ notification });
  } catch (err) {
    res.status(500).json({
      message: "Hubo un error con la notificacion",
      error: err.message,
    });
  }
};

// PUT: editNotification
exports.editNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, titulo, mensaje, estado, prioridad } = req.body;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "La notificacion no existe." });
    }

    await notification.update({
      tipo: tipo || notification.tipo,
      titulo: titulo || notification.titulo,
      mensaje: mensaje || notification.mensaje,
      estado: estado || notification.estado,
      prioridad: prioridad || notification.prioridad,
    });

    res.status(200).json({
      message: "La notificacion se actualizo con exito.",
      notification,
    });
  } catch (err) {
    res.status(500).json({
      message: "Hubo un error al actualizar la notificacion",
      error: err.message,
    });
  }
};



