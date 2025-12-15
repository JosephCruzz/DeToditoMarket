const express = require("express");
const routes = express.Router();

const detalleDeVentaC = require("../controllers/detalleDeVenta");

routes.post("/crear", detalleDeVentaC.addDetalleVenta);
routes.get("/", detalleDeVentaC.getDetalleVenta);
routes.put("/editar/:id", detalleDeVentaC.editDetalleVenta);
routes.delete("/eliminar/:id", detalleDeVentaC.deleteDetalleVenta);

module.exports = routes;
