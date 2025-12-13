 /** 
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar usuarios del sistema
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         nombre_completo:
 *           type: string
 *         rol_id:
 *           type: integer
 *         estado:
 *           type: string
 *         creado_en:
 *           type: string
 *           format: date-time
 *         actualizado_en:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         username: "admin"
 *         nombre_completo: "Juan Pérez"
 *         rol_id: 1
 *         estado: "Activo"
 *         creado_en: "2024-01-10T12:00:00Z"
 *         actualizado_en: "2024-01-11T14:00:00Z"
 *
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - nombre_completo
 *         - rol_id
 *         - estado
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         nombre_completo:
 *           type: string
 *         rol_id:
 *           type: integer
 *         estado:
 *           type: string
 *       example:
 *         username: "juan123"
 *         password: "123456"
 *         nombre_completo: "Juan Pérez"
 *         rol_id: 2
 *         estado: "Activo"
 *
 *     UsuarioUpdate:
 *       type: object
 *       required:
 *         - username
 *         - nombre_completo
 *         - rol_id
 *         - estado
 *       properties:
 *         username:
 *           type: string
 *         nombre_completo:
 *           type: string
 *         rol_id:
 *           type: integer
 *         estado:
 *           type: string
 *       example:
 *         username: "juan_update"
 *         nombre_completo: "Juan Pérez Actualizado"
 *         rol_id: 2
 *         estado: "Activo"
 *
 *     UsuarioPassword:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *       example:
 *         password: "nuevaPass1234"
 */

/**
 * @swagger
 * /user/getUsers:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Usuario"
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /user/addUser:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsuarioInput"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /user/editUser/{id}:
 *   put:
 *     summary: Editar datos del usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsuarioUpdate"
 *     responses:
 *       200:
 *         description: Usuario editado exitosamente
 *       400:
 *         description: Datos incompletos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /user/editPassword/{id}:
 *   put:
 *     summary: Cambiar la contraseña de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UsuarioPassword"
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Datos incompletos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getUsers", userController.getUsers);
router.post("/addUser", userController.addUser);
router.put("/editUser/:id", userController.editUser);
router.put("/editPassword/:id", userController.editPassword);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;