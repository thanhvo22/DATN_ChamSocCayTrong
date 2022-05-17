const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedListSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  playlistID: {
    type: Schema.Types.ObjectId,
    ref: "Playlists"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Savedlists", savedListSchema);
