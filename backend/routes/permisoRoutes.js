const express = require("express");
const router = express.Router();
<<<<<<< HEAD

const permisosController = require("../controllers/permisoController");

=======
const permisosController = require("../controllers/permisoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Permiso:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
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
 *   - name: Permisos
 *     description: API endpoints para gestionar permisos
 */

/**
 * @swagger
 * /permiso/crear:
 *   post:
 *     summary: Crear un nuevo permiso
 *     tags: [Permisos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Permiso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 permiso:
 *                   $ref: '#/components/schemas/Permiso'
 *       400:
 *         description: Error de validación o permiso duplicado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /permiso/{id}:
 *   get:
 *     summary: Obtener un permiso por ID
 *     tags: [Permisos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permiso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permiso:
 *                   $ref: '#/components/schemas/Permiso'
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /permiso/{id}:
 *   put:
 *     summary: Actualizar un permiso por ID
 *     tags: [Permisos]
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
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permiso actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /permiso/{id}:
 *   delete:
 *     summary: Eliminar un permiso por ID
 *     tags: [Permisos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permiso eliminado exitosamente
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error interno del servidor
 */

>>>>>>> develop
router.post("/crear", permisosController.addPermiso);
router.get("/:id", permisosController.getPermisoById);
router.put("/:id", permisosController.updatePermiso);
router.delete("/:id", permisosController.deletePermiso);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> develop
