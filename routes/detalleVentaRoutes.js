const express = require("express");
const routes = express.Router();

const detalleDeVentaC = require("../controllers/detalleVentaController");

routes.post("/crear", detalleDeVentaC.addDetalleVenta);
routes.get("/", detalleDeVentaC.getDetalleVenta);
routes.put("/editar/:id", detalleDeVentaC.editDetalleVenta);
routes.delete("/eliminar/:id", detalleDeVentaC.deleteDetalleVenta);

module.exports = routes;