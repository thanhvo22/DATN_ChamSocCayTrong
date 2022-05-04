const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getAllCategory);

router.get("/:id", categoryController.getCategoryID);

router.post("/create", categoryController.postCreateCategory);

router.put("/edit/:id", categoryController.putCategory);

router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
