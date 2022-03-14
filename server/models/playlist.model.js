const mongoose = require("mongoose");
const schema = mongoose.Schema;

const playlistSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playlistName: { type: String, maxlength: 255 },
  video: {
      type: Schema.Types.ObjectId,
      ref: "Videos"
  },
  rating:{
    type: Schema.Types.ObjectId,
    ref: "Rating"
  }
});

module.exports = mongoose.model('Playlists', playlistSchema);
