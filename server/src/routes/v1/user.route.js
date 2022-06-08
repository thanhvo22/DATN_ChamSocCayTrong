const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const upload = require("../../utils/multer");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserID);

router.post("/create", upload.single("images"),userController.postCreateUser);

router.put("/edit/:id", upload.single("images"),userController.putUser);

router.delete("/delete/:id", userController.deleteUserID);

module.exports = router;
