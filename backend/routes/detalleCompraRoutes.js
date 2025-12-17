const express = require("express");
const routes = express.Router();
const controllersDetalleC = require("../controllers/detalleCompraController");

routes.post("/crear", controllersDetalleC.addDetalleCompra);
<<<<<<< HEAD
routes.post("/bulk", controllersDetalleC.addDetalleCompraBulk); //lo mismo que en reportesventas, es para agregar varios detalles de compra a la vez
=======
<<<<<<< HEAD
>>>>>>> develop
routes.get("/", controllersDetalleC.getDetalleCompra);
=======
routes.post("/bulk", controllersDetalleC.addDetalleCompraBulk); //lo mismo que en reportesventas, es para agregar varios detalles de compra a la vez

>>>>>>> develop


module.exports = routes;