const express = require("express");
const routes = express.Router();
const facturaC = require("../controllers/factura");

routes.get("/", facturaC.getFactura);
routes.post("/crear", facturaC.addFactura);
routes.put("/actualizar/:id", facturaC.editFactura);
routes.delete("/anular/:numero_factura", facturaC.deleteFactura);
module.exports = routes;
