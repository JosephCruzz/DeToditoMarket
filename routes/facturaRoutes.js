const express = require("express");
const routes = express.Router();
const facturaC = require("../controllers/factura");

routes.post("/crear", facturaC.addFactura);

module.exports = routes;
