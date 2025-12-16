const express = require("express");
const routes = express.Router();
const facturaC = require("../controllers/facturaController");

routes.get("/", facturaC.getFactura);
routes.post("/crear", facturaC.addFactura);
routes.put("/actualizar/:id", facturaC.editFactura);
routes.delete("/anular/:numero_factura", facturaC.deleteFactura);
module.exports = routes;

/**
 * @swagger
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       required:
 *         - cai_id
 *         - rtn_emisor
 *         - nombre_emisor
 *         - direccion_emisor
 *         - telefono_emisor
 *         - correo_emisor
 *         - nombre_cliente
 *         - rtn_cliente
 *         - direccion_cliente
 *         - telefono_cliente
 *         - numero_factura
 *         - metodo_pago
 *         - moneda
 *         - subtotal
 *         - impuestos
 *         - total
 *         - fecha_emision
 *         - observaciones
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la factura (auto-generado)
 *         cai_id:
 *           type: integer
 *           description: ID del CAI asociado
 *         rtn_emisor:
 *           type: string
 *           description: RTN del emisor
 *         nombre_emisor:
 *           type: string
 *           description: Nombre del emisor
 *         direccion_emisor:
 *           type: string
 *           description: Dirección del emisor
 *         telefono_emisor:
 *           type: string
 *           description: Teléfono del emisor
 *         correo_emisor:
 *           type: string
 *           description: Correo electrónico del emisor
 *         nombre_cliente:
 *           type: string
 *           description: Nombre del cliente
 *         rtn_cliente:
 *           type: string
 *           description: RTN del cliente
 *         direccion_cliente:
 *           type: string
 *           description: Dirección del cliente
 *         telefono_cliente:
 *           type: string
 *           description: Teléfono del cliente
 *         numero_factura:
 *           type: string
 *           description: Número único de la factura
 *         metodo_pago:
 *           type: string
 *           description: Método de pago utilizado
 *         moneda:
 *           type: string
 *           description: Moneda utilizada
 *         subtotal:
 *           type: number
 *           format: decimal
 *           description: Subtotal de la factura
 *         impuestos:
 *           type: number
 *           format: decimal
 *           description: Impuestos aplicados
 *         total:
 *           type: number
 *           format: decimal
 *           description: Total de la factura
 *         fecha_emision:
 *           type: string
 *           format: date
 *           description: Fecha de emisión de la factura (YYYY-MM-DD)
 *         observaciones:
 *           type: string
 *           description: Observaciones adicionales
 *         estado:
 *           type: string
 *           description: Estado de la factura (ACTIVA/ANULADA)
 *       example:
 *         cai_id: 1
 *         rtn_emisor: "08019999999999"
 *         nombre_emisor: "DeToditoMarket"
 *         direccion_emisor: "Tegucigalpa, Honduras"
 *         telefono_emisor: "22221111"
 *         correo_emisor: "ventas@detoditomarket.com"
 *         nombre_cliente: "Juan Pérez"
 *         rtn_cliente: "08011234567890"
 *         direccion_cliente: "Comayagüela, Honduras"
 *         telefono_cliente: "99887766"
 *         numero_factura: "001-001-01-00000001"
 *         metodo_pago: "Efectivo"
 *         moneda: "HNL"
 *         subtotal: 100.00
 *         impuestos: 15.00
 *         total: 115.00
 *         fecha_emision: "2025-12-15"
 *         observaciones: "Pago en efectivo"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "Error"
 *         message:
 *           type: string
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "Success"
 *         message:
 *           type: object
 */

/**
 * @swagger
 * tags:
 *   name: Facturas
 *   description: API para la gestión de facturas
 */

/**
 * @swagger
 * /factura:
 *   get:
 *     summary: Obtiene todas las facturas
 *     tags: [Facturas]
 *     description: Retorna una lista con todas las facturas ordenadas por ID ascendente
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Factura'
 *       404:
 *         description: No se encontraron facturas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "Error"
 *               message: "No se encontraron Facturas"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /factura/crear:
 *   post:
 *     summary: Crea una nueva factura
 *     tags: [Facturas]
 *     description: Crea una nueva factura con todos los datos requeridos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Error de validación o número de factura duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               duplicado:
 *                 value:
 *                   status: "Error"
 *                   message: "El numero de factura tiene que ser único."
 *               fechaInvalida:
 *                 value:
 *                   status: "Error"
 *                   message: "El campo tiene que ser una fecha"
 *       409:
 *         description: El CAI especificado no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "Error"
 *               message: "El numero de Cai no es existente"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Hubo un error creando la factura"
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /factura/actualizar/{id}:
 *   put:
 *     summary: Actualiza una factura existente
 *     tags: [Facturas]
 *     description: Actualiza todos los campos de una factura existente por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: Array con el número de registros actualizados
 *       400:
 *         description: Error de validación, fecha incorrecta, factura no existente o CAI inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               noExiste:
 *                 value:
 *                   status: "Error"
 *                   message: "Esta factura no es existente."
 *               fechaInvalida:
 *                 value:
 *                   status: "Error"
 *                   message: "La fecha está incorrecta tiene que ser formato YYYY-MM-DD"
 *               caiInvalido:
 *                 value:
 *                   status: "Error"
 *                   message: "El numero de cai es inválido."
 *       409:
 *         description: El número de factura ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "Error"
 *               message: "El numero de factura tiene que ser único."
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /factura/anular/{id}:
 *   delete:
 *     summary: Anula una factura
 *     tags: [Facturas]
 *     description: Cambia el estado de una factura a "ANULADA" (no elimina físicamente el registro)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a anular
 *     responses:
 *       200:
 *         description: Factura anulada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: string
 *                   example: "La factura ha sido anulada con éxito."
 *       404:
 *         description: Factura no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "Error"
 *               message: "No se encontró la factura seleccionada"
 *       409:
 *         description: La factura ya está anulada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "Error"
 *               message: "La factura ya se encuentra anulada."
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
