const express = require("express");
const router = express.Router();

const auditoriaController = require("../controllers/auditoria.js");

router.post("/crear", auditoriaController.addAuditoria);


module.exports = router;
