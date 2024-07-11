const express = require("express");
require("dotenv").config();
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const PORT = process.env.port || 9000;

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use("/api", require("./src/routes"));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
