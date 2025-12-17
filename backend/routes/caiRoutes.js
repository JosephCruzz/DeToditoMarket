const controllersCai = require("../controllers/caiController")

const express = require("express");
const routes = express.Router();

routes.post("/crear",controllersCai.addCai);
routes.get("/",controllersCai.getCai);
routes.put("/:id",controllersCai.editCai);
routes.delete("/eliminar/:id",controllersCai.deleteCai);

module.exports = routes;