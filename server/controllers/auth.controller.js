const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../models/user.model");

export const authController = {
  postRegister: async (req, res) => {
    const { user, pass, gender, email, birthDate, name } = req.body;

    if (!user || !pass)
      return res.status(400).json({
        success: false,
        message: "user or pass trong ",
      });

    try {
      const userName = await Users.findOne({ user });
      console.log(userName);
      if (userName)
        return res.status(400).json({
          success: false,
          message: "user da ton tai",
        });

      const hashedPass = await argon2.hash(pass);
      const newUser = new Users({
        user,
        pass: hashedPass,
        gender,
        email,
        birthDate,
        name,
      });

      await newUser.save();
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: " user created successfully ",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "error!!!!",
      });
    }
  },

  postLogin: async (req, res) => {
    const { user, pass } = req.body;
    if (!user || !pass)
      return res.status(400).json({
        success: false,
        message: "user or pass trong ",
      });

    try {
      const userName = await Users.findOne({ user });

      if (!userName)
        return res.status(400).json({
          success: false,
          message: "tai khoan khong co ton tai",
        });

      const passValid = await argon2.verify(userName.pass, pass);
      if (!passValid)
        return res.status(400).json({
          success: false,
          message: "mat khau or tai khoan k dung",
        });

      //all good -> return token
      const accessToken = jwt.sign(
        { userId: userName._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.cookie("cookie_id", userName.id, {
        signed: true,
      });

      res.json({
        success: true,
        message: " login successfully ",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "error",
      });
    }
  },
};