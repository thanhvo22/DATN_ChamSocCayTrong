const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  videos: [
    {
      video_id: { type: Schema.Types.ObjectId, ref: "Videos" },
    },
  ],
  rating: {type:Number},
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Playlists", playlistSchema);
