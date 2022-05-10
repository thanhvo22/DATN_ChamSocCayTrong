const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playlistID: {
    type: Schema.Types.ObjectId,
    ref: "Playlists"
  },
  nameVideo: { type: String, maxlength: 255 },
  linkVideo: { type: String, maxlength: 255 },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Videos", videoSchema);
