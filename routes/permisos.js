const express = require("express");
const router = express.Router();

const permisosController = require("../controllers/permisos.js");

router.post("/crear", permisosController.addPermiso);

module.exports = router;
