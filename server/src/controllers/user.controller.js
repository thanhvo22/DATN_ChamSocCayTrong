const userModel = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");
const argon2 = require("argon2");

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(201).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};

module.exports.getUserID = async (req, res) => {
  let id = req.params.id;
  const user = await userModel.findOne({ _id: id });
  res.json({
    success: true,
    data: user,
  });
};

module.exports.postCreateUser = async (req, res) => {
  const { user, pass, passAgain, gender, email, birthDate, name, typeofUser } =
    req.body;
  let path = req.file;
  console.log("path", path);
  const result = await cloudinary.uploader.upload(path?.path);
  console.log("result: ", result);
  if (!user || !pass)
    return res.status(400).json({
      success: false,
      message: "user or pass trong ",
    });

  try {
    const userName = await userModel.findOne({ user });
    if (userName)
      return res.status(400).json({
        success: false,
        message: "user da ton tai",
      });
    if (passAgain != pass) {
      return res.status(403).json({
        message: "pass nhap lai chua dung, vui long thu lai",
      });
    }
    const hashedPass = await argon2.hash(pass);
    const newUser = new userModel({
      user,
      pass: hashedPass,
      gender,
      email,
      birthDate,
      name,
      typeofUser,
      images: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await newUser.save();
    res.json({
      success: true,
      message: " user created successfully ",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error!!!!",
    });
  }
};

module.exports.putUser = async (req, res) => {
  try {
    const _id = req.params.id;
    let user_cloud = await userModel.findById(_id);
    if (user_cloud.cloudinary_id !== undefined) {
      await cloudinary.uploader.destroy(user_cloud?.cloudinary_id);
    }
    let path = req.file;
    let newAvatar;
    if (path) {
      newAvatar = await cloudinary.uploader.upload(path.path);
    }
    const { gender, email, birthDate, name, typeofUser } = req.body;
    const user = await userModel.findByIdAndUpdate(_id, {
      gender,
      email,
      birthDate,
      name,
      typeofUser,
      images: newAvatar.secure_url || user_cloud?.cloudinary_id,
      cloudinary_id: newAvatar.public_id || user_cloud?.cloudinary_id,
    });
    res.json({
      message:"update user successfully",
      user
    })
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteUserID = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete({ _id: req.params.id });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false });
    console.log(error);
  }
};
