/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para gestionar productos del inventario
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductoInput:
 *       type: object
 *       required:
 *         - nombre
 *         - precio
 *         - stock
 *         - stock_minimo
 *         - fecha_vencimiento
 *       properties:
 *         id_user:
 *           type: integer
 *           description: ID del usuario que realiza la acción
 *         nombre:
 *           type: string
 *           description: Nombre del producto
 *         precio:
 *           type: number
 *           description: Precio del producto
 *         stock:
 *           type: integer
 *           description: Cantidad en inventario
 *         stock_minimo:
 *           type: integer
 *           description: Stock mínimo
 *         fecha_vencimiento:
 *           type: string
 *           format: date
 *           description: Fecha de vencimiento del producto
 *         estado:
 *           type: string
 *           description: Estado del producto (para anulación)
 */

/**
 * @swagger
 * /producto/getInventory:
 *   get:
 *     summary: Obtener todos los productos del inventario
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /producto/addToInventory:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProductoInput"
 *     responses:
 *       200:
 *         description: Producto creado
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error en servidor
 */

/**
 * @swagger
 * /producto/editInventory/{id}:
 *   put:
 *     summary: Editar un producto del inventario
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProductoInput"
 *     responses:
 *       200:
 *         description: Producto editado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en servidor
 */

/**
 * @swagger
 * /producto/deleteFromInventory/{id}:
 *   put:
 *     summary: Anular o cambiar el estado de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a anular
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
 *                 description: Estado nuevo del producto (ej. "Anulado")
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Bad request
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */

const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/getInventory", productoController.getInventory);
router.post("/addToInventory", productoController.addToInventory);
router.put("/editInventory/:id", productoController.editInventory);
router.put("/deleteFromInventory/:id", productoController.deleteFromInventory);

module.exports = router;