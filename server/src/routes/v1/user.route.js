const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const upload = require("../../utils/multer");
const adminAuthentication = require("../../middlewares/adminAuthentication");

router.get("/", adminAuthentication,userController.getAllUsers);
router.put("/edit/blocked/:id", userController.blockUser);
router.put("/edit/active/:id", userController.activeUser);
router.get("/:id", userController.getUserID);

router.post("/create", adminAuthentication,upload.single("images"),userController.postCreateUser);

router.put("/edit/:id", upload.single("images"),userController.putUser);

router.delete("/delete/:id",adminAuthentication, userController.deleteUserID);

module.exports = router;
