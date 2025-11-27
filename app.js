const express = require("express");
const session = require("express-session");
const path = require("node:path");
const userValidation = require("./validators/userValidator");
const messageValidation = require("./validators/messageValidator");
const passport = require("./validators/passport");
const userController = require("./controllers/userController");
const messageController = require("./controllers/messageController");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard-cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

function checkingAuthentication(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/login");
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", userController.getSignUpForm);
app.post("/signup", userValidation.userCreatePost, userController.createUser);
app.get("/login", userController.getLogInForm);
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);
app.get("/home", checkingAuthentication, userController.getUserHome);
app.get("/logout", userController.userLogOut);
app.get("/join-club", userController.joinSecretClub);
app.get("/new-message", messageController.getMessageForm);
app.post(
  "/new-message",
  messageValidation.createMessage,
  messageController.createMessage
);

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`Connected on port: ${PORT}`);
});
