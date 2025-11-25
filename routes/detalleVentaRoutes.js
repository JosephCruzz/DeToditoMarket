const express = require("express");
const Routes = express.Router();

const detalleVentaC = require("../controllers/detalleVenta");

Routes.post("/crear",detalleVentaC.addDetalleVenta);

module.exports = Routes;