const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  name: { type: String, maxlength: 255, min: 10 }
});

module.exports = mongoose.model('Categories', categorySchema);
