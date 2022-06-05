require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require('cors');

const cookieMiddleWare = require("./middlewares/cookie.middleware");
const authRoute = require("./routes/v1/auth.route");
const userRoute = require("./routes/v1/user.route");
const categoryRoute = require("./routes/v1/category.route");
const playlistRoute = require("./routes/v1/playlists.route");
const videoRoute = require("./routes/v1/video.route");
const commentRoute = require("./routes/v1/comment.route");
const rateRoute = require("./routes/v1/rating.route");
const savedListRoute = require("./routes/v1/savedList.route");
const verifyToken = require("./middlewares/auth.middleware");
const adminAuthentication = require("./middlewares/adminAuthentication");

const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:3000"
  },
));
app.use(cookieParser(process.env.SESSION_SECRET)); //using signed \\ signedCookies // khong khac gi cookie nhung co them secret, co the ktra cookie.
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.get("/", (req, res) => {
  res.send("Đồ án tốt nghiệp !");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/playlists", playlistRoute);
app.use("/api/v1/videos", videoRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/rates",  rateRoute);
app.use("/api/v1/savedlist", cookieMiddleWare, savedListRoute);

module.exports = app;
