const Database = require("better-sqlite3");

const db = new Database("attendance.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS attendance (
        student_id INTEGER PRIMARY KEY,
        status TEXT NOT NULL
    )
`);

console.log("Database ready");
module.exports = db;