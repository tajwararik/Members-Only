const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       first_name VARCHAR(25) NOT NULL,
       last_name VARCHAR(25) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       membership BOOLEAN DEFAULT FALSE,
       admin BOOLEAN DEFAULT FALSE
    );
    
    
    CREATE TABLE IF NOT EXISTS messages (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       text TEXT NOT NULL,
       timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       user_id INTEGER REFERENCES users(id) ON DELETE CASCADE);
    `;

async function createTable() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

createTable();
