/**
 * @swagger
 * tags:
 *   name: Caja
 *   description: API para gestionar la caja
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Caja:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 5
 *         saldo_inicial:
 *           type: number
 *           format: float
 *           example: 1000.00
 *         saldo_final:
 *           type: number
 *           format: float
 *           example: 1500.50
 *         fecha_apertura:
 *           type: string
 *           format: date-time
 *           example: "2025-12-16T10:00:00Z"
 *         fecha_cierre:
 *           type: string
 *           format: date-time
 *           example: "2025-12-16T18:00:00Z"
 *         estado:
 *           type: string
 *           example: "abierta"
 */

/**
 * @swagger
 * /caja/abrirCaja:
 *   post:
 *     summary: Abrir una nueva caja
 *     tags: [Caja]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - saldo_inicial
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID del usuario que abre la caja
 *                 example: 5
 *               saldo_inicial:
 *                 type: number
 *                 format: float
 *                 description: Saldo inicial de la caja
 *                 example: 1000.00
 *     responses:
 *       200:
 *         description: Caja creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caja'
 *       400:
 *         description: Ya hay una caja abierta
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /caja/getCaja/{id}:
 *   get:
 *     summary: Obtener información de una caja por ID
 *     tags: [Caja]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la caja
 *     responses:
 *       200:
 *         description: Caja encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caja'
 *       404:
 *         description: Caja no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /caja/deleteCaja/{id}:
 *   delete:
 *     summary: Eliminar una caja por ID
 *     tags: [Caja]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la caja a eliminar
 *     responses:
 *       200:
 *         description: Caja eliminada con éxito
 *       404:
 *         description: Caja no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /caja/cerrarCaja/{id}:
 *   put:
 *     summary: Cerrar una caja existente
 *     tags: [Caja]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la caja a cerrar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - saldo_final
 *             properties:
 *               saldo_final:
 *                 type: number
 *                 format: float
 *                 description: Saldo final de la caja
 *                 example: 1500.50
 *     responses:
 *       200:
 *         description: Caja cerrada con éxito
 *       404:
 *         description: Caja no encontrada
 *       500:
 *         description: Error del servidor
 */

const express= require("express");
const router=express.Router();
const Caja = require("../controllers/cajaController");

router.post("/abrirCaja", Caja.abrirCaja);
router.get("/getCaja/:id", Caja.getCaja);
router.delete("/deleteCaja/:id", Caja.deleteCaja);
router.put("/cerrarCaja/:id", Caja.cerrarCaja);

module.exports = router;