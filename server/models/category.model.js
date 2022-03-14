const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  categoryName: { type: String, maxlength: 255 }
});

module.exports = mongoose.model('Category', categorySchema);