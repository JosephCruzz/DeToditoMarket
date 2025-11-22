const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/getInventory", productoController.getInventory);
router.post("/addToInventory", productoController.addToInventory);
router.put("/editInventory/:id", productoController.editInventory);
router.delete("/deleteFromInventory/:id", productoController.deleteFromInventory);

module.exports = router;