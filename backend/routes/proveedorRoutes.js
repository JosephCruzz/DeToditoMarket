const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedorController");

router.get("/getSuppliers", proveedorController.getSuppliers);
router.post("/addSupplier", proveedorController.addSupplier);
router.put("/editSupplier/:id", proveedorController.editSupplier);
router.delete("/deleteSupplier/:id", proveedorController.deleteSupplier);

module.exports = router;