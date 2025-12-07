const express = require("express");
const router = express.Router();

const auditoriaController = require("../controllers/auditoriaController");

router.post("/crear", auditoriaController.addAuditoria);
router.get("/", auditoriaController.getAuditorias);
router.get("/:id", auditoriaController.getAuditoriaById);


module.exports = router;