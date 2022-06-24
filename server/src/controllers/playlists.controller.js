// const playlistsModel = require("../models/playlists.model");
const playlistModel = require("../models/playlists.model");
const savedListModel = require("../models/savedList.model");
const videoModel = require("../models/video.model");

const cloudinary = require("../utils/cloudinary");

module.exports.getPlayListForSharer = async (req, res) => {
  const userId = req.header("userId");
  const playList = await playlistModel
    .find({ userId: userId })
    .populate(["userId", "categoryId"]);
  res.json(playList);
};

module.exports.getCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const playLists = await playlistModel
      .find({categoryId})
      .where({ status: "Accept" })
      .populate(["userId", "categoryId"]);
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

module.exports.search = async (req, res) => {
  const { name } = req.query;
  let matchedPlaylist = await playlistModel
    .find()
    .where({ status: "Accept" })
    .populate(["userId", "categoryId"]);
  const playlist = await matchedPlaylist.filter((list) => {
    return list.playlistName.toLowerCase().indexOf(name.toLowerCase()) !== -1;
  });

  res.json({ message: "OK", playlist });
};
module.exports.getAllPlayList = async (req, res) => {
  try {
    const playLists = await playlistModel
      .find()
      .populate(["userId", "categoryId"]);
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
    const playList = await playlistModel
      .findById(id)
      .populate(["userId", "categoryId"]);
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
      .populate(["userId", "categoryId"]);
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
    console.log("api running");
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
  console.log("API Running");
  try {
    const id = req.params.id;
    // let user_cloud = await userModel.findById(_id);
    // if (user_cloud.cloudinary_id !== undefined) {
    //   await cloudinary.uploader.destroy(user_cloud?.cloudinary_id);
    // }
    let path = req.file;
    let newAvatar;
    if (path) {
      newAvatar = await cloudinary.uploader.upload(path.path);
    }
    const { playlistName, preview, status, categoryId } = req.body;
    const playlist = await playlistModel.findByIdAndUpdate(id, {
      playlistName,
      preview,
      status,
      categoryId,
      images: newAvatar?.secure_url,
      cloudinary_id: newAvatar?.public_id,
    });
    console.log(playlist);
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
  await savedListModel.findOneAndRemove({playlistId : id});
  await videoModel.deleteMany({playlistId:id});

  return res.json({
    message: "delete playlist success fully",
  });
};
