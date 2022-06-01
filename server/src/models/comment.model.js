const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playlistId: {
    type: Schema.Types.ObjectId,
    ref: "Playlists"
  },
  comment: { type: String, maxlength: 255, min: 3 },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comments", commentSchema);
