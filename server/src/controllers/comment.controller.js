const commentModel = require("../models/comment.model");

module.exports.getComments = async (req, res) => {
  const comments = await commentModel.find();
  res.json(comments);
};

module.exports.getCommentsForPlaylist = async (req, res) => {
  const playlistId = req.params.playlistId;
  const comments = await commentModel.find({playlistId}).populate("userId");
  res.json({
    message: "comments for playlist",
    comments
  })
}

module.exports.postCreateCmt = async (req, res) => {
  console.log("created new comment");
  try {
    
    const { comment, userId, playlistId } = req.body;
    const newComment = await commentModel.create({
      userId,
      playlistId,
      comment,
    });
    console.log("Comment created", newComment);
    res.json(newComment);
  } catch (error) {
    res.json(error);
  }
};

module.exports.putCmt = async (req, res) => {
  console.log("edit new comment");
  try {
    const id = req.params.id;

    const { comment } = req.body;
    const newComment = await commentModel.findByIdAndUpdate(id, {
      comment,
    });

    res.json({
      message: "edit comment successfully",
      newComment,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports.deleteCmt = async (req, res) => {
  const id = req.params.id;
  await commentModel.findByIdAndDelete(id);
  res.json({
    message: "delete comment successfully",
  });
};
