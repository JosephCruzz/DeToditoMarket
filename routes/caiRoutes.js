const controllersCai = require("../controllers/caiController")

const express = require("express");
const Routes = express.Router();

Routes.post("/crear",controllersCai.addCai);

module.exports = Routes;