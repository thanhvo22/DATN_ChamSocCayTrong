require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://thanhvo22:2212@chamsoccaytrong-v1.owuep.mongodb.net/chamsoccaytrong_v1?retryWrites=true&w=majority`
    );

    console.log("mongodb connected!");



    
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

//const db = require('./connect');

const app = express();
// db.connect();
dbConnect();

app.use(express.json());
//app.use(cors());
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log(`Example app listening on http://localhost:5000/`);
});
