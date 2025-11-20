const express = require("express");
const routes = express.Router();

const controllersCompras = require("../controllers/compras");

routes.post("/crear",controllersCompras.addCompra);

module.exports = routes;