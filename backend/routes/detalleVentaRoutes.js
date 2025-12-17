const express = require("express");
const routes = express.Router();

const detalleDeVentaC = require("../controllers/detalleVentaController");

routes.post("/crear", detalleDeVentaC.addDetalleVenta);
routes.get("/", detalleDeVentaC.getDetalleVenta);
routes.put("/editar/:id", detalleDeVentaC.editDetalleVenta);
routes.delete("/eliminar/:id", detalleDeVentaC.deleteDetalleVenta);
routes.post("/bulk", detalleDeVentaC.addDetalleVentaBulk); //se agrega varios detalles de venta a la vez con esta ruta

module.exports = routes;