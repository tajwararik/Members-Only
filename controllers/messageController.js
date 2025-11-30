const messageQueries = require("../db/queries");

function getMessageForm(req, res) {
  res.render("new-message");
}

async function createMessage(req, res) {
  const userID = req.user.id;
  const { title, message } = req.validatedMessage;
  await messageQueries.createMessage(title, message, userID);
  res.redirect("/home");
}

async function deleteMessage(req, res) {
  const { id } = req.params;
  await messageQueries.deleteMessage(id);
  res.redirect("/home");
}

module.exports = {
  getMessageForm,
  createMessage,
  deleteMessage,
};
