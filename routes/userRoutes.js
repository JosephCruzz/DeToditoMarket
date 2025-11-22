const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getUsers", userController.getUsers);
router.post("/addUser", userController.addUser);
router.put("/editUser/:id", userController.editUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;