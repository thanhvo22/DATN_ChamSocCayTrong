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
  ratingList: { type: Number },
});

module.exports = mongoose.model("Ratings", videoSchema);
