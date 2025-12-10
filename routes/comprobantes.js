const express = require("express");
const router = express.Router();

const permisosController = require("../controllers/comprobantes.js");

router.post("/crear", permisosController.addComprobante);


module.exports = router;
