const mongoose = require("mongoose");
const schema = mongoose.Schema;

const videoSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  videoTitleName: { type: String, maxlength: 255 },
  linkVideo: { type: String, maxlength: 255 },
  comment: {
      type: Schema.Types.ObjectId,
      ref:"Comments"
  }
});

module.exports = mongoose.model("Videos", videoSchema);
