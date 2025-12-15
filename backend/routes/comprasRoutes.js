const express = require("express");
const routes = express.Router();

const controllersCompras = require("../controllers/compras");

routes.post("/crear", controllersCompras.addCompra);
routes.get("/",controllersCompras.getCompra);
routes.put("/:id", controllersCompras.editCompra);

module.exports = routes;
