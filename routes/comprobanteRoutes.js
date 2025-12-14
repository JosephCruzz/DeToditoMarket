const express = require("express");
const router = express.Router();

const comprobantesController = require("../controllers/comprobanteController");

router.post("/crear", comprobantesController.addComprobante);
router.put("/:id", comprobantesController.editComprobante);
router.get("/:id", comprobantesController.getComprobante);


module.exports = router;