const mongoose = require("mongoose");
const schema = mongoose.Schema;

const playlistSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playlistName: { type: String, maxlength: 255 },
  preview: { type: String, maxlength: 255 },
  status: {
    type: String,
    enum: ["Pending", "Accept", "Refuse"],
    default: "Pending",
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Playlists', playlistSchema);
