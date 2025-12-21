import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('kiosco.db');

export const initDB = () => {
  return new Promise((resolve, reject) => {
    try {
      db.execSync(`
        CREATE TABLE IF NOT EXISTS clients (
            dni TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            course TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            description TEXT,
            isPaid INTEGER NOT NULL,
            date TEXT NOT NULL,
            clientId TEXT,
            FOREIGN KEY (clientId) REFERENCES clients(dni)
        );
      `);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
