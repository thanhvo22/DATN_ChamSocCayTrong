const express = require("express");
const statisticController = require("../../controllers/statistic.controller");
const router = express.Router();

router.get("/", statisticController.all);

module.exports = router;
