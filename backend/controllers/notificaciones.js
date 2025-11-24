const db = require ("../models");
const Notification = db.notificaciones;

//POST addNotification
exports.addNotification = async (req, res) => {
    try {
        const {user_id, tipo, titulo, mensaje, estado, prioridad } = req.body;

        const notification = await Notification.create({
            user_id,
            tipo,
            titulo,
            mensaje,
            estado: estado || 'no_leida',
            prioridad: prioridad || 'media',
        });

        res.status(201).json({ 
            message: 'Notification created successfully', 
            notification 
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};