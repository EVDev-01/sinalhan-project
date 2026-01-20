const Database = require("better-sqlite3");
const path = require("path");

// Create database file
const dbPath = path.join(__dirname, "../iskolar_overflow.db");
const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create tables
const initDatabase = () => {
  // Questions table
  db.exec(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT DEFAULT 'Anonymous Iskolar',
        tags TEXT,
        campus TEXT NOT NULL,
        department TEXT NOT NULL,
        votes INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT (datetime('now', 'localtime')),
        updated_at DATETIME DEFAULT (datetime('now', 'localtime'))
      )
    `);

  // Comments table
  db.exec(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        author TEXT DEFAULT 'Anonymous Iskolar',
        votes INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT (datetime('now', 'localtime')),
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      )
    `);

  console.log("✅ SQLite database initialized");
};

// Initialize on import
initDatabase();

module.exports = db;
