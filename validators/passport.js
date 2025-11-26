const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userQueries = require("../db/queries");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await userQueries.getUserByEmail(email);

        if (!user) return done(null, false, { message: "Incorrect email" });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userQueries.getUserByID(id);

    done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
