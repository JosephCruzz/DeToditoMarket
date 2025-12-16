const express = require("express");
const routes = express.Router();

const controllersCompras = require("../controllers/compraController");

routes.post("/crear", controllersCompras.addCompra);
routes.put("/:id", controllersCompras.editCompra);
routes.get("/",controllersCompras.getCompra);

module.exports = routes;
