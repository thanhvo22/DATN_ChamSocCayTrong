require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cookieMiddleWare = require ("./middlewares/cookie.middleware");
const authRoute = require("./routes/v1/auth.route");
const userRoute = require("./routes/v1/user.route");
const categoryRoute = require("./routes/v1/category.route");
const playlistRoute = require("./routes/v1/playlist.route");

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET)); //using signed \\ signedCookies // khong khac gi cookie nhung co them secret, co the ktra cookie.
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Đồ án tốt nghiệp !");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/playlist", playlistRoute);

module.exports = app;