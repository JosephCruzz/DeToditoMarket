const express = require("express");
const router = express.Router();

const permisosController = require("../controllers/permisos.js");

router.post("/crear", permisosController.addPermiso);
router.get("/:id", permisosController.getPermisoById);
router.put("/:id", permisosController.updatePermiso);

module.exports = router;
