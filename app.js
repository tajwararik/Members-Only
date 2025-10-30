const express = require("express");
const path = require("node:path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, (error) => {
  if (error) throw error;

  console.log(`Connected on port: ${PORT}`);
});
