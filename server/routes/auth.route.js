require('dotenv').config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const Users = require("../models/user.model");

// register
router.post("/register", async (req, res) => {
  const { user, pass, gender, email, birthDate, name } = req.body;

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
            message: "user da ton tai"
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
    const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

    res.json({
        success: true,
        message: " user created successfully ",
        accessToken
    })
  } catch (error) {
    console.log('error')
  }
});


module.exports = router