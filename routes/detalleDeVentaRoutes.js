const express = require("express");
const routes = express.Router();

const detalleDeVentaC = require("../controllers/detalleDeVenta");

routes.post("/crear", detalleDeVentaC.addDetalleVenta);
routes.get("/", detalleDeVentaC.getDetalleVenta);

module.exports = routes;
