const express = require("express");
const router = express.Router();
const playlistController = require("../../controllers/playlists.controller");

//getplaylist for sharers
router.get("/for-you", playlistController.getPlayListForSharer);

router.get("/", playlistController.getAllPlayList);
router.get("/:playlistId", playlistController.getPlayListID);
router.put("/edit/accept/:id", playlistController.acceptPlaylist);
router.put("/edit/refuse/:id", playlistController.refusePlaylist)
router.post("/create", playlistController.postCreatePlayList);
router.put("/edit/:id", playlistController.putPlayList);
router.delete("/delete/:id", playlistController.deletePlayList);


module.exports = router;
