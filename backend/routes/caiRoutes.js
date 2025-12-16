/**
 * @swagger
 * tags:
 *   name: CAI
 *   description: API para gestionar CAI (Código de Autorización de Impuestos)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cai:
 *       type: object
 *       required:
 *         - codigo_cai
 *         - rango_inicial
 *         - rango_final
 *         - fecha_autorizacion
 *         - fecha_limite_emision
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del registro CAI
 *           example: 1
 *         codigo_cai:
 *           type: string
 *           description: Código único del CAI
 *           example: "A123456789"
 *         rango_inicial:
 *           type: integer
 *           description: Número inicial del rango autorizado
 *           example: 1000
 *         rango_final:
 *           type: integer
 *           description: Número final del rango autorizado
 *           example: 2000
 *         fecha_autorizacion:
 *           type: string
 *           format: date
 *           description: Fecha de autorización del CAI
 *           example: "2025-12-01"
 *         fecha_limite_emision:
 *           type: string
 *           format: date
 *           description: Fecha límite de emisión
 *           example: "2025-12-31"
 *         estado:
 *           type: string
 *           description: Estado del CAI
 *           example: "activo"
 *         observaciones:
 *           type: string
 *           description: Observaciones adicionales
 *           example: "Ninguna Observación"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-16T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-16T12:34:56Z"
 */

/**
 * @swagger
 * /cai/crear:
 *   post:
 *     summary: Crear un nuevo registro CAI
 *     tags: [CAI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo_cai
 *               - rango_inicial
 *               - rango_final
 *               - fecha_autorizacion
 *               - fecha_limite_emision
 *             properties:
 *               codigo_cai:
 *                 type: string
 *                 description: Código único del CAI
 *                 example: "A123456789"
 *               rango_inicial:
 *                 type: integer
 *                 description: Número inicial del rango autorizado
 *                 example: 1000
 *               rango_final:
 *                 type: integer
 *                 description: Número final del rango autorizado
 *                 example: 2000
 *               fecha_autorizacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de autorización
 *                 example: "2025-12-01"
 *               fecha_limite_emision:
 *                 type: string
 *                 format: date
 *                 description: Fecha límite de emisión
 *                 example: "2025-12-31"
 *               estado:
 *                 type: string
 *                 description: Estado del CAI
 *                 example: "activo"
 *               observaciones:
 *                 type: string
 *                 description: Observaciones adicionales
 *                 example: "Ninguna Observación"
 *     responses:
 *       201:
 *         description: CAI creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cai'
 *       400:
 *         description: Datos inválidos o incompletos
 *       409:
 *         description: Código CAI ya existe (violación de unique constraint)
 *       500:
 *         description: Error del servidor
 */

const controllersCai = require("../controllers/caiController")

const express = require("express");
const Routes = express.Router();

Routes.post("/crear",controllersCai.addCai);

module.exports = Routes;