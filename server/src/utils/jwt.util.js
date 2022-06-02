const jwt = require("jsonwebtoken");

const generateJWT = (data) => {
  const token = jwt.sign({ ...data }, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

const verifyJWT = (token) => {
  const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return data;
};

module.exports = {
  generateJWT,
  verifyJWT
};
