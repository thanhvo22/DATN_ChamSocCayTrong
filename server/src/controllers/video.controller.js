const videoModel = require("../models/video.model");
const playlistModel = require("../models/playlists.model");

module.exports.getVideos = async (req, res) => {
  //   const userId = req.signedCookies.cookie_id;
  //   const playList = await videoModel.findById(userId);
  const videos = await videoModel.find();
  res.json(videos);
};
module.exports.getVideo  = async (req, res) => {
  const id = req.params.id;
  const video = await videoModel.findById(id).populate(['userId', 'playlistId']);
  res.json(video);
}

module.exports.getVideoByPlayListId = async (req, res) => {
  const playlistId = req.params.playlistId;
  const videos = await videoModel.find({playlistId:playlistId});
  res.json({
    message: "get all videos by playlist id successfully",
    videos
  });
}

module.exports.postCreateVideo = async (req, res) => {
  try {
    const playlistId = req.params.playlistID;

    const { userId,nameVideo, linkVideo } = req.body;
    const newLinkVideo = linkVideo.replace("https://youtu.be/", "https://www.youtube.com/embed/");

    const video = await videoModel.create({
      userId,
      playlistId,
      nameVideo,
      linkVideo: newLinkVideo,
    });

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
    const newLinkVideo = linkVideo.replace("https://youtu.be/", "https://www.youtube.com/embed/");
    const video = await videoModel.findByIdAndUpdate(id, {
      nameVideo,
      linkVideo: newLinkVideo,
    });

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
  await videoModel.findByIdAndDelete(id);

  return res.json({
    message: "delete playlist success fully",
  });
};
