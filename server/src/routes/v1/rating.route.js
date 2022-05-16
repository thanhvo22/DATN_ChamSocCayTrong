const express = require("express");
const router = express.Router();
const rateController = require("../../controllers/rating.controller");

router.get('/', rateController.getRateForPlayList);
router.post("/create", rateController.postCreateRate);

module.exports =router;