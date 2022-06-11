const playlistModel = require("../models/playlists.model");
const cloudinary = require("../utils/cloudinary");

module.exports.getPlayListForSharer = async (req, res) => {
  const userId = req.header('userId');
  const playList = await playlistModel.find({userId:userId});
  res.json(playList);
};

module.exports.getAllPlayList = async (req, res) => {
  try {
    const playLists = await playlistModel.find().populate("userId");
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
    const id = req.params.playlistId;
    res.cookie("playlist_id", id, {
      signed: true,
    });
    const playList = await playlistModel.findById(id).populate("userId");
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

module.exports.playlistAccept = async (req, res) => {
  try {
    const playLists = await playlistModel
      .find()
      .where({ status: "Accept" })
      .populate("userId");
    return res.json({
      message: "get All play list accept",
      playLists,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports.acceptPlaylist = async (req, res) => {
  const id = req.params.id;
  const playlist = await playlistModel.findByIdAndUpdate(id, {
    status: "Accept",
  });
  res.json(playlist);
};

module.exports.refusePlaylist = async (req, res) => {
  const id = req.params.id;
  const playlist = await playlistModel.findByIdAndUpdate(id, {
    status: "Refuse",
  });
  res.json(playlist);
};

module.exports.postCreatePlayList = async (req, res) => {
  try {
    const { userId, playlistName, preview, categoryId } = req.body;
    let path = req.file;
    console.log("path", path);
    let result;
    if (path) {
      result = await cloudinary.uploader.upload(path?.path);
    }
    const playlist = await playlistModel.create({
      userId,
      playlistName,
      preview,
      categoryId,
      images: result?.secure_url || undefined,
      cloudinary_id: result?.public_id || undefined,
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
    const { playlistName, preview, status } = req.body;
    const playlist = await playlistModel.findByIdAndUpdate(id, {
      playlistName,
      preview,
      status,
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
