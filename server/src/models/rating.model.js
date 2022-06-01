const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playListRating: { 
    type: Schema.Types.ObjectId,
    ref: "Playlists",
  },
  rating: { type: Number, min: 0, max:10 },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ratings", ratingSchema);
