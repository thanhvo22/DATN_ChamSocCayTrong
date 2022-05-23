const express = require("express");
const authController = require("../../controllers/auth.controller");
const router = express.Router();

// register
router.post("/register", authController.postRegister);

//login
router.post("/login", authController.postLogin);
router.get("/logout", authController.deleteLogin);

module.exports = router;
