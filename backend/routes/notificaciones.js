/**
 * @swagger
 * tags:
 *   name: Notificaciones
 *   description: API para gestionar notificaciones de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notificacion:
 *       type: object
 *       required:
 *         - user_id
 *         - titulo
 *         - mensaje
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la notificación
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: ID del usuario destinatario
 *           example: 2
 *         tipo:
 *           type: string
 *           description: Tipo de notificación
 *           example: "alerta"
 *         titulo:
 *           type: string
 *           description: Título de la notificación
 *           example: "Pago pendiente"
 *         mensaje:
 *           type: string
 *           description: Contenido del mensaje
 *           example: "El pago de la factura #123 está pendiente"
 *         estado:
 *           type: string
 *           description: Estado de la notificación
 *           example: "no_leida"
 *         prioridad:
 *           type: string
 *           description: Nivel de prioridad
 *           example: "alta"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *           example: "2025-12-16T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización
 *           example: "2025-12-16T12:34:56Z"
 */

/**
 * @swagger
 * /notificaciones/crear:
 *   post:
 *     summary: Crear una nueva notificación
 *     tags: [Notificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - titulo
 *               - mensaje
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID del usuario destinatario
 *                 example: 2
 *               tipo:
 *                 type: string
 *                 description: Tipo de notificación
 *                 example: "alerta"
 *               titulo:
 *                 type: string
 *                 description: Título de la notificación
 *                 example: "Pago pendiente"
 *               mensaje:
 *                 type: string
 *                 description: Contenido del mensaje
 *                 example: "El pago de la factura #123 está pendiente"
 *               estado:
 *                 type: string
 *                 description: Estado de la notificación
 *                 example: "no_leida"
 *               prioridad:
 *                 type: string
 *                 description: Nivel de prioridad
 *                 example: "alta"
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification created successfully."
 *                 notification:
 *                   $ref: '#/components/schemas/Notificacion'
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /notificaciones/{id}:
 *   get:
 *     summary: Obtener una notificación por ID
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notification:
 *                   $ref: '#/components/schemas/Notificacion'
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /notificaciones/{id}:
 *   put:
 *     summary: Actualizar una notificación existente
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "alerta"
 *               titulo:
 *                 type: string
 *                 example: "Pago actualizado"
 *               mensaje:
 *                 type: string
 *                 example: "El pago de la factura #123 ha sido actualizado"
 *               estado:
 *                 type: string
 *                 example: "leida"
 *               prioridad:
 *                 type: string
 *                 example: "alta"
 *     responses:
 *       200:
 *         description: Notificación actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La notificacion se actualizo con exito."
 *                 notification:
 *                   $ref: '#/components/schemas/Notificacion'
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /notificaciones/{id}:
 *   delete:
 *     summary: Eliminar una notificación
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notificación a eliminar
 *     responses:
 *       200:
 *         description: Notificación eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La notificacion se elimino con exito."
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error del servidor
 */

const express = require("express");
const routes = express.Router();

const controllersNotificaciones = require("../controllers/notificaciones");

routes.post("/crear",controllersNotificaciones.addNotification);
routes.get("/:id", controllersNotificaciones.getNotification);
routes.put("/:id", controllersNotificaciones.editNotification);
routes.delete("/:id", controllersNotificaciones.deleteNotification);

module.exports = routes;