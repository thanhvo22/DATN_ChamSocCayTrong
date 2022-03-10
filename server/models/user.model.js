const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  accountName: {
    type: String,
    require: true,
    unique: true,
  },
  typeofUser: {
    type: String,
    enum: ["Admin", "Employee", "Customer"],
    default: "Employee",
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
  lastName: { type: String, maxlength: 100 },
  firstName: { type: String, maxlength: 100 },
  birthDate: { type: Date },
  images: { type: String, maxlength: 255 },
});

module.exports = mongoose.model("Users", userSchema);
