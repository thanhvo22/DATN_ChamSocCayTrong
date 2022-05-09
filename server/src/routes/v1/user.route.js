const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserID);

router.post("/create", userController.postCreateUser);

router.put("/edit/:id", userController.putUser);

router.delete("/delete/:id", userController.deleteUserID);

module.exports = router;
