const express = require("express");
const routes = express.Router();

const controllersNotificaciones = require("../controllers/notificaciones");

routes.post("/crear",controllersNotificaciones.addNotification);

module.exports = routes;