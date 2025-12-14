const express = require("express");
const routes = express.Router();
const controllersDetalleC = require("../controllers/detalleCompraController");

routes.post("/crear", controllersDetalleC.addDetalleCompra);
routes.get("/", controllersDetalleC.getDetalleCompra);

module.exports = routes;