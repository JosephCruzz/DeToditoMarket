const express= require("express");
const router=express.Router();
const Caja = require("../controllers/cajaController");

router.post("/abrirCaja", Caja.abrirCaja);
router.get("/getCaja/:id", Caja.getCaja);
router.delete("/deleteCaja/:id", Caja.deleteCaja);
router.put("/cerrarCaja/:id", Caja.cerrarCaja);

module.exports = router;