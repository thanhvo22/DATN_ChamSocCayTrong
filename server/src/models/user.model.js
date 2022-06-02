const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: {
    type: String,
    require: true,
    unique: true,
    min: 6,
    max: 20
  },
  typeofUser: {
    type: String,
    enum: ["User", "Sharers", "Admin", "CTV"],
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
    min: 24,
    max: 40
  },
  pass: {
    type: String,
    require: true,
    min: 6,
    max: 30
  },
  name: { type: String, maxlength: 100, min: 7 },
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
