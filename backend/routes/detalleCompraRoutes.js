/**
 * @swagger
 * tags:
 *   name: DetalleCompra
 *   description: Endpoints para gestionar detalles de compra
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DetalleCompraInput:
 *       type: object
 *       required:
 *         - producto_id
 *         - compra_id
 *         - cantidad
 *         - precio_unitario
 *       properties:
 *         producto_id:
 *           type: integer
 *           description: ID del producto
 *           example: 1
 *         compra_id:
 *           type: integer
 *           description: ID de la compra
 *           example: 1
 *         cantidad:
 *           type: integer
 *           description: Cantidad del producto
 *           example: 3
 *         precio_unitario:
 *           type: number
 *           format: float
 *           description: Precio unitario del producto
 *           example: 25.5
 *     DetalleCompra:
 *       allOf:
 *         - $ref: '#/components/schemas/DetalleCompraInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID del detalle de compra
 *               example: 1
 */

/**
 * @swagger
 * /detalleCompra/crear:
 *   post:
 *     summary: Crear un detalle de compra
 *     tags: [DetalleCompra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleCompraInput'
 *     responses:
 *       201:
 *         description: Detalle de compra creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleCompra'
 *       400:
 *         description: Error de validación o llave foránea inexistente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Los campos cantidad y precio_unitario tienen que ser numericos"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hubo un error al realizar el detalle de la compra"
 */

/**
 * @swagger
 * /detalleCompra/bulk:
 *   post:
 *     summary: Crear múltiples detalles de compra
 *     tags: [DetalleCompra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/DetalleCompraInput'
 *     responses:
 *       201:
 *         description: Detalles de compra creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleCompra'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Se esperaba un array de detalles"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /detalleCompra/:
 *   get:
 *     summary: Obtener todos los detalles de compra
 *     tags: [DetalleCompra]
 *     responses:
 *       200:
 *         description: Lista de detalles de compra
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleCompra'
 *       404:
 *         description: No se encontraron detalles de compra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron detalles de compra en la base de datos"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se pudo obtener los datos"
 */

const express = require("express");
const routes = express.Router();
const controllersDetalleC = require("../controllers/detalleCompraController");

routes.post("/crear", controllersDetalleC.addDetalleCompra);
routes.post("/bulk", controllersDetalleC.addDetalleCompraBulk); //lo mismo que en reportesventas, es para agregar varios detalles de compra a la vez
routes.get("/", controllersDetalleC.getDetalleCompra);


module.exports = routes;