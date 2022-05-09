const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: {
    type: String,
    require: true,
    unique: true,
  },
  typeofUser: {
    type: String,
    enum: ["User", "Sharers"],
    default: "User",
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
  status: {
    type: String,
    enum: ["Normal", "Blocked"],
    default: "Normal",
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Users", userSchema);
