const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles.js");

router.post("/crear", rolesController.addRole);
router.get("/:id", rolesController.getRole);
router.put("/:id", rolesController.updateRole);



module.exports = router;
