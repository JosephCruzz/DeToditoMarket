const express = require("express");
const routes = express.Router();

const controllersCompras = require("../controllers/compraController");

routes.post("/crear", controllersCompras.addCompra);
<<<<<<< HEAD
=======
routes.put("/:id", controllersCompras.editCompra);
>>>>>>> develop
routes.get("/",controllersCompras.getCompra);

module.exports = routes;