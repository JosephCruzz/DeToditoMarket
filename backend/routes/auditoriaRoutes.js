/**
 * @swagger
 * components:
 *   schemas:
 *     Auditoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         producto_id:
 *           type: integer
 *         entrada_salida:
 *           type: string
 *         descripcion:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   - name: Auditoria
 *     description: Registro de auditoría del sistema
 */

/**
 * @swagger
 * /auditoria/crear:
 *   post:
 *     summary: Crear un registro de auditoría
 *     tags: [Auditoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - entrada_salida
 *             properties:
 *               user_id:
 *                 type: integer
 *               producto_id:
 *                 type: integer
 *               entrada_salida:
 *                 type: string
 *                 example: "entrada"
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro de auditoría creado exitosamente
 *       400:
 *         description: Error de validación o claves foráneas inválidas
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /auditoria:
 *   get:
 *     summary: Obtener todos los registros de auditoría
 *     tags: [Auditoria]
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /auditoria/{id}:
 *   get:
 *     summary: Obtener un registro de auditoría por ID
 *     tags: [Auditoria]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro de auditoría no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();

const auditoriaController = require("../controllers/auditoriaController");

router.post("/crear", auditoriaController.addAuditoria);
router.get("/", auditoriaController.getAuditorias);
router.get("/:id", auditoriaController.getAuditoriaById);


module.exports = router;