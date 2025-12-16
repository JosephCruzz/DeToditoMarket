/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: API para gestionar proveedores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Proveedor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         telefono:
 *           type: string
 *         direccion:
 *           type: string
 *         estado:
 *           type: string
 *       example:
 *         id: 1
 *         nombre: "Distribuidora López"
 *         telefono: "9988-7766"
 *         direccion: "Barrio Centro, SPS"
 *         estado: "Activo"
 *
 *     ProveedorInput:
 *       type: object
 *       required:
 *         - nombre
 *         - telefono
 *         - direccion
 *       properties:
 *         nombre:
 *           type: string
 *         telefono:
 *           type: string
 *         direccion:
 *           type: string
 *         estado:
 *           type: string
 *           description: Estado del proveedor (opcional, por ejemplo "Activo" o "Anulado")
 *       example:
 *         nombre: "Distribuidora López"
 *         telefono: "9988-7766"
 *         direccion: "Barrio Centro, SPS"
 *         estado: "Activo"
 */

/**
 * @swagger
 * /proveedor/getSuppliers:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Proveedor"
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /proveedor/addSupplier:
 *   post:
 *     summary: Agregar un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProveedorInput"
 *     responses:
 *       200:
 *         description: Proveedor agregado exitosamente
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /proveedor/editSupplier/{id}:
 *   put:
 *     summary: Editar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProveedorInput"
 *     responses:
 *       200:
 *         description: Proveedor editado exitosamente
 *       400:
 *         description: Datos incompletos
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /proveedor/deleteSupplier/{id}:
 *   put:
 *     summary: Anular o cambiar el estado de un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proveedor a anular
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
 *                 description: Nuevo estado del proveedor (ej. "Anulado")
 *             example:
 *               estado: "Anulado"
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */

const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedorController");

router.get("/getSuppliers", proveedorController.getSuppliers);
router.post("/addSupplier", proveedorController.addSupplier);
router.put("/editSupplier/:id", proveedorController.editSupplier);
router.put("/deleteSupplier/:id", proveedorController.deleteSupplier);

module.exports = router;