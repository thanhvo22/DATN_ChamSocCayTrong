const express = require("express");
const router = express.Router();
const playlistController = require("../../controllers/playlist.controller");

//getplaylist for sharers
router.get("/for-you", playlistController.getPlayListForSharer);

router.get("/", playlistController.getAllPlayList);
router.get("/:id", playlistController.getPlayListID);
router.post("/create", playlistController.postCreatePlayList);
router.put("/edit/:id", playlistController.putPlayList);
router.delete("/delete/:id", playlistController.deletePlayList);


module.exports = router;
