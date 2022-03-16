const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ratingSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playListRating: {
    type: Schema.Types.ObjectId,
    ref: "Playlists",
  },
  rating: { type: Number },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ratings", videoSchema);
