const videoModel = require("../models/video.model");
const playlistModel = require("../models/playlist.model");

module.exports.getVideos = async (req, res) => {
  //   const userID = req.signedCookies.cookie_id;
  //   const playList = await videoModel.findById(userID);
  const videos = await videoModel.find();
  res.json(videos);
};

module.exports.postCreateVideo = async (req, res) => {
  try {
    const userID = req.signedCookies.cookie_id;
    const playlistID = req.params.playlistID;

    const { nameVideo, linkVideo } = req.body;
    const video = await videoModel.create({
      userID,
      playlistID,
      nameVideo,
      linkVideo,
    });
    await playlistModel.findOneAndUpdate(
      { id: playlistID },
      {
        $push: {
          videos: {
            video_id: video.id,
          },
        },
      }
    );

    return res.json({
      message: "create playlist successfully",
      video,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

module.exports.putVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const { nameVideo, linkVideo } = req.body;
    const video = await videoModel.findByIdAndUpdate(id, {
      nameVideo,
      linkVideo,
    });

    await playlistModel.findOneAndUpdate(
      { id: playlistID, "videos.video_id": id },
      {
        video_id: video.id,
      }
    );
    return res.json({
      message: "edit video successfully",
      playlist,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
module.exports.deleteVideo = async (req, res) => {
  const id = req.params.id;
  await videoModel.findByIdAndRemove(id);
  await playlistModel.findOneAndRemove(
    { id},
    { $pull: { videos: { video_id: id } } },
    false, // Upsert
    true // Multi
  );

  return res.json({
    message: "delete playlist success fully",
  });
};
