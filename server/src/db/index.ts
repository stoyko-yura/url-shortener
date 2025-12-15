import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { config } from "../config";

sqlite3.verbose();

const dir = path.dirname(config.dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

let db: sqlite3.Database;

const initDb = async () => {
  db = new sqlite3.Database(config.dbPath, (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    }
  });

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS urls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_url TEXT NOT NULL,
        short_code TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error("Error creating urls table:", err.message);
        }
      }
    );
  });
};

export { db, initDb };
