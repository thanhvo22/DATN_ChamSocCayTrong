const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  user: {
    type: String,
    require: true,
    unique: true,
  },
  typeofUser: {
    type: String,
    enum: ["Admin", "CTV"],
    default: "CTV",
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ"],
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  pass: {
    type: String,
    require: true,
  },
  name: { type: String, maxlength: 100 },
  birthDate: { type: Date },
  images: { type: String, maxlength: 255 },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Admin", adminSchema);
