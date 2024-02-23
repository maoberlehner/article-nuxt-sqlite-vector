import Database from 'better-sqlite3';
import * as sqlite_vss from 'sqlite-vss';

export const init = () => {
  const db = new Database('./db/vector-database.db');
  db.pragma('journal_mode = WAL');
  sqlite_vss.load(db);

  return db;
};
