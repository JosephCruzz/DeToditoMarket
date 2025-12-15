const express = require("express");
const router = express.Router();

const comprobantesController = require("../controllers/comprobantes.js");

router.post("/crear", comprobantesController.addComprobante);
router.put("/:id", comprobantesController.editComprobante);
router.get("/:id", comprobantesController.getComprobante);
router.delete("/:id", comprobantesController.deleteComprobante);


module.exports = router;
