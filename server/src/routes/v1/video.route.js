const express = require("express");
const router = express.Router();

const videoController = require("../../controllers/video.controller");

router.get("/", videoController.getVideos);
router.get("/:playlistId", videoController.getVideoByPlayListId);
router.post("/create/:playlistID", videoController.postCreateVideo);
router.put("/edit/:id", videoController.putVideo);
router.delete("/delete/:id", videoController.deleteVideo);
module.exports = router;
