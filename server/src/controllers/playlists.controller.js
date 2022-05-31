const playlistModel = require("../models/playlists.model");

module.exports.getPlayListForSharer = async (req, res) => {
  const userID = req.signedCookies.cookie_id;
  const playList = await playlistModel.findById(userID);
  res.json(playList);
};

module.exports.getAllPlayList = async (req, res) => {
  try {
    const playLists = await playlistModel.find().populate("userID");
    return res.json({
      message: "get All play list",
      playLists,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports.getPlayListID = async (req, res) => {
  try {
    const id = req.params.id; 
    res.cookie("playlist_id", id, {
      signed: true,
    });
    const playList = await playlistModel.findById(id);
    return res.json({
      message: "get play list",
      playList,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports.postCreatePlayList = async (req, res) => {
  try {
    const userID = req.signedCookies.cookie_id;
    const { playlistName, preview } = req.body;
    const playlist = await playlistModel.create({
      userID,
      playlistName,
      preview,
    });
    return res.json({
      message: "create playlist successfully",
      playlist,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports.putPlayList = async (req, res) => {
  try {
    const id = req.params.id;
    const { playlistName, preview } = req.body;
    const playlist = await playlistModel.findByIdAndUpdate(id, {
      playlistName,
      preview,
    });
    return res.json({
      message: "edit play list successfully",
      playlist,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
module.exports.deletePlayList = async (req, res) => {
  const id = req.params.id;
  await playlistModel.findByIdAndRemove(id);
  return res.json({
    message: "delete playlist success fully",
  });
};
