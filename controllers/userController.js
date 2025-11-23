const bcrypt = require("bcryptjs");
const userQueries = require("../db/queries");

async function createUser(req, res) {
  const { firstName, lastName, email, password } = req.validatedUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  await userQueries.createUser(firstName, lastName, email, hashedPassword);
  res.redirect("/signup");
}

module.exports = {
  createUser,
};
