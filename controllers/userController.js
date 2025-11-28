const bcrypt = require("bcryptjs");
const userQueries = require("../db/queries");

function getSignUpForm(req, res) {
  res.render("signup");
}

async function createUser(req, res) {
  const { firstName, lastName, email, password } = req.validatedUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  await userQueries.createUser(firstName, lastName, email, hashedPassword);
  res.redirect("/signup");
}

function getLogInForm(req, res) {
  res.render("login");
}

async function getUserHome(req, res) {
  const messagesByUsers = await userQueries.getMessagesFromUsers();
  res.render("home", { userObj: req.user, users: messagesByUsers });
}

function userLogOut(req, res, next) {
  req.logout((error) => {
    if (error) return next(error);

    res.redirect("/");
  });
}

function joinSecretClub(req, res) {
  res.render("join-club");
}

module.exports = {
  getSignUpForm,
  createUser,
  getLogInForm,
  getUserHome,
  userLogOut,
  joinSecretClub,
};
