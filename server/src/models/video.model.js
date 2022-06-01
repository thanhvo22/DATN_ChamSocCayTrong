const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playlistId: {
    type: Schema.Types.ObjectId,
    ref: "Playlists"
  },
  nameVideo: { type: String, maxlength: 255, min: 10 },
  linkVideo: { type: String, maxlength: 255, min:10 },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Videos", videoSchema);
