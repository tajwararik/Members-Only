const { body, validationResult, matchedData } = require("express-validator");

const signupValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name can't be empty")
    .isAlpha()
    .withMessage("First name only contains letters")
    .isLength({ min: 1, max: 20 })
    .withMessage("Length between 1 and 20 characters"),

  body("lastName")
    .trim()
    .isAlpha()
    .withMessage("Last name only contains letters")
    .isLength({ min: 1, max: 20 })
    .withMessage("Length between 1 and 20 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Email is not valid"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Length should be at least 6"),
];

exports.userCreatePost = [
  signupValidation,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        title: "Sign up",
        errors: errors.array(),
      });
    }

    req.validatedUser = matchedData(req);

    next();
  },
];
