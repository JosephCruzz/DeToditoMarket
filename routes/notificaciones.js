const express = require("express");
const routes = express.Router();

const controllersNotificaciones = require("../controllers/notificaciones");

routes.post("/crear",controllersNotificaciones.addNotification);
routes.get("/:id", controllersNotificaciones.getNotification);


module.exports = routes;