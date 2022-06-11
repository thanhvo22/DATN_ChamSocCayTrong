const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  categoryId: { type: Schema.Types.ObjectId, ref: "Categories" },
  playlistName: { type: String, maxlength: 255, min: 5 },
  preview: { type: String, maxlength: 255, min: 5 },
  status: {
    type: String,
    enum: ["Pending", "Accept", "Refuse"],
    default: "Pending",
  },
  rating: { type: Number, min: 0, max: 10 },
  createAt: {
    type: Date,
    default: Date.now,
  },
  image: { type: String },
  cloudinary_id: { type: String },
});

module.exports = mongoose.model("Playlists", playlistSchema);
