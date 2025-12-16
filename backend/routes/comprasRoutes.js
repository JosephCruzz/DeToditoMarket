const express = require("express");
const routes = express.Router();
const controllersCompras = require("../controllers/compraController");

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Gestión de compras
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Compra:
 *       type: object
 *       required:
 *         - proveedor_id
 *         - user_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la compra
 *         proveedor_id:
 *           type: integer
 *           description: ID del proveedor
 *         user_id:
 *           type: integer
 *           description: ID del usuario que realiza la compra
 *         estado:
 *           type: string
 *           description: Estado de la compra
 *           enum: [pendiente, anulado]
 *           default: pendiente
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la compra
 *         actualizado_en:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       example:
 *         id: 1
 *         proveedor_id: 5
 *         user_id: 2
 *         estado: pendiente
 *         fecha_creacion: 2025-12-15T10:30:00.000Z
 *         actualizado_en: 2025-12-15T10:30:00.000Z
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: Error
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /compra:
 *   get:
 *     summary: Obtener todas las compras
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de compras obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Compra'
 *       404:
 *         description: No se encontraron compras
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.get("/", controllersCompras.getCompra);

/**
 * @swagger
 * /compra/crear:
 *   post:
 *     summary: Crear una nueva compra
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proveedor_id
 *               - user_id
 *             properties:
 *               proveedor_id:
 *                 type: integer
 *                 description: ID del proveedor
 *               user_id:
 *                 type: integer
 *                 description: ID del usuario
 *               estado:
 *                 type: string
 *                 description: Estado de la compra (opcional, por defecto "pendiente")
 *             example:
 *               proveedor_id: 5
 *               user_id: 2
 *               estado: pendiente
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       400:
 *         description: Datos inválidos o falta de campos obligatorios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.post("/crear", controllersCompras.addCompra);

/**
 * @swagger
 * /compra/anular/{id}:
 *   put:
 *     summary: Anular una compra
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compra a anular
 *     responses:
 *       200:
 *         description: Compra anulada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Compra anulada correctamente
 *       400:
 *         description: Datos inválidos o estado no permitido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Compra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.put("/anular/:id", controllersCompras.editCompra);

module.exports = routes;
