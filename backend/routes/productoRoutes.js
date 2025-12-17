<<<<<<< HEAD
=======
/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para gestionar productos del inventario
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
 *   delete:
 *     summary: Eliminar un producto del inventario
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en servidor
 */

>>>>>>> develop
const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/getInventory", productoController.getInventory);
router.post("/addToInventory", productoController.addToInventory);
router.put("/editInventory/:id", productoController.editInventory);
router.delete("/deleteFromInventory/:id", productoController.deleteFromInventory);

module.exports = router;