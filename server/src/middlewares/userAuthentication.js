const userModel = require("../models/user.model");
const {verifyJWT} = require("../utils/jwt.util");

const userAuthentication = async (req, res, next) => {
  // const authHeader = req.header("Authorization");
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.header("x-auth-token");
  // console.log("token_server:", token);
  if (!token) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }
  const { userId, role } = verifyJWT(token);
  
  const user = await userModel.findById(userId);
  if (!user) {
    return res.json({ message: "account not found" });
  }
  if (role !== "User") {
    return res.json({
      message: " ban khong co quyen vao page nay :))",
    });
  }

  next();
};

module.exports = { userAuthentication };
