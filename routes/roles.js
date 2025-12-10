const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles");

router.post("/crear", rolesController.addRole);


module.exports = router;
