const express = require("express");
const path = require("node:path");
const userValidation = require("./validators/userValidator");
const userController = require("./controllers/userController");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", userValidation.userCreatePost, userController.createUser);

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`Connected on port: ${PORT}`);
});
