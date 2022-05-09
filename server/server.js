require("dotenv").config();
const express = require("express");
const db = require("./config/connect");
const app = require("./app");
const mongoose = require("mongoose");

db.connect();
//dbConnect();
app.listen(5000, () => {
  console.log(`Example app listening on http://localhost:5000`);
});
