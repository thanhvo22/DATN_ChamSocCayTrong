const userModel = require("../models/user.model");
const {verifyJWT} = require("../utils/jwt.util");

const adminAuthentication = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  const { userId, role } = verifyJWT(token);
  
  const user = await userModel.findById(userId);
  if (!user) {
    return res.json({ message: "account not found" });
  }
  if (role !== "Admin") {
    return res.json({
      message: " ban khong co quyen vao page nay :))",
    });
  }

  next();
};

module.exports = { adminAuthentication };
