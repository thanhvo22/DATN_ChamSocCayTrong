const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playlistID: {
    type: Schema.Types.ObjectId,
    ref: "Playlists"
  },
  comment: { type: String, maxlength: 255 },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comments", commentSchema);
