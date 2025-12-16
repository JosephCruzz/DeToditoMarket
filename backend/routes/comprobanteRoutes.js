/**
 * @swagger
 * components:
 *   schemas:
 *     Comprobante:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         factura_id:
 *           type: integer
 *         caja_id:
 *           type: integer
 *         tipo:
 *           type: string
 *           enum: [efectivo, transferencia]
 *         numero_referencia:
 *           type: string
 *         monto:
 *           type: number
 *         observaciones:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   - name: Comprobantes
 *     description: Gestión de comprobantes de pago
 */

/**
 * @swagger
 * /comprobante/crear:
 *   post:
 *     summary: Crear un comprobante
 *     tags: [Comprobantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - tipo
 *               - monto
 *             properties:
 *               factura_id:
 *                 type: integer
 *               caja_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *                 enum: [efectivo, transferencia]
 *               numero_referencia:
 *                 type: string
 *               monto:
 *                 type: number
 *               observaciones:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comprobante creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /comprobante/{id}:
 *   get:
 *     summary: Obtener comprobante por ID
 *     tags: [Comprobantes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comprobante encontrado
 *       404:
 *         description: Comprobante no encontrado
 *       500:
 *         description: Error del servidor
 *
 *   put:
 *     summary: Editar comprobante
 *     tags: [Comprobantes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               factura_id:
 *                 type: integer
 *               caja_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *                 enum: [efectivo, transferencia]
 *               numero_referencia:
 *                 type: string
 *               monto:
 *                 type: number
 *               observaciones:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comprobante actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Comprobante no encontrado
 *       500:
 *         description: Error interno del servidor
 */


const express = require("express");
const router = express.Router();

const comprobantesController = require("../controllers/comprobanteController");

router.post("/crear", comprobantesController.addComprobante);
router.put("/:id", comprobantesController.editComprobante);
router.get("/:id", comprobantesController.getComprobante);


module.exports = router;