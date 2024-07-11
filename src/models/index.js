const mongoose = require("mongoose");
require("dotenv").config();
const mongodbURL = process.env.mongodbURL;

mongoose.connect(mongodbURL, {
  // useNewUrlParser: true,
});

const con = mongoose.connection;
mongoose.set("debug", true);
con.on("open", () => {
  console.log("connected to database");
});

module.exports = con;
