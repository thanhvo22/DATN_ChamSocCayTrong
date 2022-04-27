require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const db = require("./connect");
const cookieMiddleWare = require("./middlewares/cookie.middleware");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");

const app = express();
db.connect();
//dbConnect();

app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET)); //using signed \\ signedCookies
// khong khac gi cookie nhung co them secret, co the ktra cookie.
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Đồ án tốt nghiệp !");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", cookieMiddleWare, userRoute);
app.use("/api/v1/category", cookieMiddleWare, categoryRoute);

app.listen(5000, () => {
  console.log(`Example app listening on http://localhost:5000`);
});
