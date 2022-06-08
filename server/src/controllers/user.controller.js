const userModel = require("../models/user.model");

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
  const { user, pass, passAgain, gender, email, birthDate, name, typeofUser } = req.body;

  if (!user || !pass)
    return res.status(400).json({
      success: false,
      message: "user or pass trong ",
    });

  try {
    const userName = await Users.findOne({ user });
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
    const newUser = new Users({
      user,
      pass: hashedPass,
      gender,
      email,
      birthDate,
      name,
      typeofUser
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
    let updateUser = await userModel.findById(req.params.id).exec();
    updateCustomer.set(req.body);
    let result = await updateUser.save();
    res.send(result);
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
