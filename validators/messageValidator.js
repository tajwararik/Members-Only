const { body, validationResult, matchedData } = require("express-validator");

const messageValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Length between 5 and 100 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message can't be empty")
    .isLength({ min: 10, max: 500 })
    .withMessage("Length between 10 and 500 characters"),
];

exports.createMessage = [
  messageValidation,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("new-message", {
        title: "New message",
        errors: errors.array(),
      });
    }

    req.validatedMessage = matchedData(req);

    next();
  },
];
