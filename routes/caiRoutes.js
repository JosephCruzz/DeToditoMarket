const controllersCai = require("../controllers/cai")

const express = require("express");
const Routes = express.Router();

Routes.post("/crear",controllersCai.addCai);
Routes.get("/",controllersCai.getCai);
Routes.put("/:id",controllersCai.editCai);

module.exports = Routes;