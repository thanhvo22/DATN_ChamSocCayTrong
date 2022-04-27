const express = require("express");
import { authController } from '../controllers/auth.controller';
const router = express.Router();



// register
router.post("/register", authController.postRegister);

//login
router.post("/login", authController.postLogin);

module.exports = router;
