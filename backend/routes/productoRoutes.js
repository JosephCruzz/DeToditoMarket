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
 *         - id_user
 *         - nombre
 *         - precio
 *         - stock
 *         - stock_minimo
 *         - fecha_vencimiento
 *       properties:
 *         id_user:
 *           type: integer
 *           description: ID del usuario que realiza la acción
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del producto
 *           example: "Coca Cola 500ml"
 *         precio:
 *           type: number
 *           description: Precio unitario del producto
 *           example: 25.5
 *         stock:
 *           type: integer
 *           description: Cantidad disponible en inventario
 *           example: 100
 *         stock_minimo:
 *           type: integer
 *           description: Stock mínimo para alertas
 *           example: 10
 *         fecha_vencimiento:
 *           type: string
 *           format: date
 *           description: Fecha de vencimiento del producto
 *           example: "2025-12-31"
 *         estado:
 *           type: string
 *           description: Estado del producto (por ejemplo, "Anulado")
 *           example: "Activo"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductoInput'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /producto/getProduct/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductoInput'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /producto/addToInventory:
 *   post:
 *     summary: Agregar un nuevo producto al inventario
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProductoInput"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductoInput'
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /producto/editInventory/{id}:
 *   put:
 *     summary: Editar un producto existente del inventario
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProductoInput"
 *     responses:
 *       200:
 *         description: Producto editado con éxito
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /producto/deleteFromInventory/{id}:
 *   put:
 *     summary: Cambiar el estado de un producto (ej. anularlo)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
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
 *                 description: Nuevo estado del producto (ej. "Anulado")
 *                 example: "Anulado"
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */

const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/getInventory", productoController.getInventory);
router.get("/getProduct/:id", productoController.getProduct);
router.post("/addToInventory", productoController.addToInventory);
router.put("/editInventory/:id", productoController.editInventory);
router.put("/deleteFromInventory/:id", productoController.deleteFromInventory);

module.exports = router;