const bcrypt = require("bcryptjs");
const userQueries = require("../db/queries");
require("dotenv").config();

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

async function updateMembership(req, res) {
  const { passcode } = req.body;

  if (passcode !== process.env.CLUB_PASSCODE)
    return res.status(400).render("join-club", { error: "Invalid passcode" });

  await userQueries.updateMembership(req.user.id, true);

  res.redirect("/home");
}

function getAdminPage(req, res) {
  res.render("admin");
}

async function updateAdminStatus(req, res) {
  const { passcode } = req.body;

  if (passcode !== process.env.ADMIN_PASSCODE)
    return res.status(400).render("admin", { error: "Invalid passcode" });

  await userQueries.updateAdminStatus(req.user.id, true);

  res.redirect("/home");
}

module.exports = {
  getSignUpForm,
  createUser,
  getLogInForm,
  getUserHome,
  userLogOut,
  joinSecretClub,
  updateMembership,
  getAdminPage,
  updateAdminStatus,
};
