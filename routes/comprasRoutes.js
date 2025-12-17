const express = require("express");
const routes = express.Router();

const controllersCompras = require("../controllers/compraController");

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
 *         message:
 *           type: string
 *         error:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: API para gestión de compras
 */

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
 * /compra:
 *   get:
 *     summary: Obtener todas las compras
 *     tags: [Compras]
 *     description: Retorna todas las compras ordenadas por fecha de creación ascendente
 *     responses:
 *       200:
 *         description: Lista de compras obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 *       404:
 *         description: No se encontraron compras en la base de datos
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
routes.get("/",controllersCompras.getCompra);

/**
 * @swagger
 * /compra/{id}:
 *   put:
 *     summary: Anular una compra
 *     tags: [Compras]
 *     description: Cambia el estado de una compra a "anulado"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compra a anular
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [anulado]
 *                 description: Debe ser "anulado"
 *             example:
 *               estado: anulado
 *     responses:
 *       200:
 *         description: Compra anulada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 compra:
 *                   $ref: '#/components/schemas/Compra'
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
routes.put("/:id", controllersCompras.editCompra);

module.exports = routes;