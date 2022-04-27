const express = require("express");
const router = express.Router();
import { playlistController } from '../controllers/playlist.controller';

router.get("/", playlistController.getAllPlayList);
router.get("/:id", playlistController.getPlayListID);
router.post("/create", playlistController.postCreatePlayList);
router.put("/edit/:id", playlistController.putPlayList);
router.delete("delete/:id", playlistController.deletePlayList);


module.exports = router;
