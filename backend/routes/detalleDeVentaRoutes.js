const express = require("express");
const routes = express.Router();
const detalleDeVentaC = require("../controllers/detalleVentaController");

/**
 * @swagger
 * tags:
 *   name: DetalleVenta
 *   description: Gestión de detalles de venta
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DetalleVenta:
 *       type: object
 *       required:
 *         - factura_id
 *         - producto_id
 *         - cantidad
 *         - precio_unitario
 *         - descuento
 *         - total_linea
 *         - metodo_pago
 *         - observaciones
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del detalle de venta
 *         factura_id:
 *           type: integer
 *           description: ID de la factura
 *         producto_id:
 *           type: integer
 *           description: ID del producto
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha del detalle de venta
 *         cantidad:
 *           type: integer
 *           description: Cantidad de productos
 *         precio_unitario:
 *           type: number
 *           format: decimal
 *           description: Precio unitario del producto
 *         descuento:
 *           type: number
 *           format: decimal
 *           description: Descuento aplicado
 *         total_linea:
 *           type: number
 *           format: decimal
 *           description: Total de la línea
 *         metodo_pago:
 *           type: string
 *           description: Método de pago (efectivo o transferencia)
 *         observaciones:
 *           type: string
 *           description: Observaciones adicionales
 *       example:
 *         factura_id: 1
 *         producto_id: 5
 *         cantidad: 2
 *         precio_unitario: 15.50
 *         descuento: 0
 *         total_linea: 31.00
 *         metodo_pago: efectivo
 *         observaciones: Sin observaciones
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: Error
 *         message:
 *           type: string
 *     Success:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: Success
 *         message:
 *           oneOf:
 *             - type: object
 *             - type: array
 *             - type: string
 */

/**
 * @swagger
 * /detalleDeVenta:
 *   get:
 *     summary: Obtener todos los detalles de venta
 *     tags: [DetalleVenta]
 *     responses:
 *       200:
 *         description: Lista de detalles de ventas obtenida exitosamente
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
 *                     $ref: '#/components/schemas/DetalleVenta'
 *       404:
 *         description: No se encontraron detalles de ventas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.get("/", detalleDeVentaC.getDetalleVenta);

/**
 * @swagger
 * /detalleDeVenta/crear:
 *   post:
 *     summary: Crear un nuevo detalle de venta
 *     tags: [DetalleVenta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleVenta'
 *     responses:
 *       201:
 *         description: Detalle de venta creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Error en validación de campos o clave foránea inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.post("/crear", detalleDeVentaC.addDetalleVenta);

/**
 * @swagger
 * /detalleDeVenta/editar/{id}:
 *   put:
 *     summary: Editar un detalle de venta existente
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del detalle de venta a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleVenta'
 *     responses:
 *       200:
 *         description: Detalle de venta editado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Error en validación de campos o ID no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No se encontró el detalle de venta con ese ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.put("/editar/:id", detalleDeVentaC.editDetalleVenta);

/**
 * @swagger
 * /detalleDeVenta/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un detalle de venta
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del detalle de venta a eliminar
 *     responses:
 *       200:
 *         description: Detalle de venta eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: No se pudo eliminar la venta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No se encontró el detalle de venta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.delete("/eliminar/:id", detalleDeVentaC.deleteDetalleVenta);

/**
 * @swagger
 * /detalleDeVenta/bulk:
 *   post:
 *     summary: Agregar múltiples detalles de venta a la vez
 *     tags: [DetalleVenta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/DetalleVenta'
 *     responses:
 *       201:
 *         description: Detalles de venta creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Error en validación de alguno de los detalles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
routes.post("/bulk", detalleDeVentaC.addDetalleVentaBulk);

module.exports = routes;
