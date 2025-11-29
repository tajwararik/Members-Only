const pool = require("./pool");

async function createUser(first_name, last_name, email, password) {
  await pool.query(
    `INSERT INTO users(first_name, last_name, email, password) 
    VALUES($1, $2, $3, $4)`,
    [first_name, last_name, email, password]
  );
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0];
}

async function getUserByID(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  return rows[0];
}

async function createMessage(title, message, userID) {
  await pool.query(
    `INSERT INTO messages(title, text, user_id) 
    VALUES($1, $2, $3)`,
    [title, message, userID]
  );
}

async function getMessagesFromUsers() {
  const { rows } = await pool.query(
    `SELECT first_name, last_name, title, text, timestamp FROM users LEFT JOIN messages ON users.id = user_id`
  );

  return rows;
}

async function updateMembership(id, value) {
  await pool.query(
    `UPDATE users
    SET membership = $1
    WHERE id = $2`,
    [value, id]
  );
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserByID,
  createMessage,
  getMessagesFromUsers,
  updateMembership,
};
