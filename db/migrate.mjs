import Database from 'better-sqlite3';
import * as sqlite_vss from 'sqlite-vss';

const migrate = () => {
  const db = new Database('./db/vector-database.db');
  db.pragma('journal_mode = WAL');
  sqlite_vss.load(db);

  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT
    );
  `);
  db.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS products_vss USING vss0(
      vector(1536)
    );
  `);
};

migrate();
