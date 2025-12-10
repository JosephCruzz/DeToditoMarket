const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles");

router.post("/crear", rolesController.addRole);
router.get("/:id", rolesController.getRole);


module.exports = router;
