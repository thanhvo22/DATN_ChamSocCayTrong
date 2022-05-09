const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  videoID: {
    type: Schema.Types.ObjectId,
    ref: "Videos"
  },
  comment: { type: String, maxlength: 255 },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comments", commentSchema);
