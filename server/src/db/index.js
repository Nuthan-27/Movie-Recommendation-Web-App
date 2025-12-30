const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH 
  ? path.resolve(process.env.DB_PATH) 
  : path.resolve(__dirname, '../../db.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initDb();
  }
});

const fs = require('fs');

function initDb() {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error initializing database schema', err.message);
    } else {
      console.log('Database schema initialized.');
    }
  });
}

module.exports = db;
