require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const db = require('./connect');
const authRoute = require('./routes/auth.route');

const app = express();
db.connect();
//dbConnect();

app.use(express.json());
//app.use(cors());
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded


app.get("/", (req, res) => {
  res.send("Đồ án tốt nghiệp !");
});
app.use('/api/v1/auth', authRoute);

app.listen(5000, () => {
  console.log(`Example app listening on http://localhost:5000`);
});
