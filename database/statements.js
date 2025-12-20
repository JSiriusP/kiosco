const db = require('better-sqlite3')('database.db')

const createTables = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS clients (
            name TEXT NOT NULL,
            dni TEXT PRIMARY KEY,
            phone TEXT NOT NULL,
            course TEXT NOT NULL,
        );

        CREATE TABLE IF NOT EXISTS pay(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE NOT NULL,
            amount DOUBLE NOT NULL,
            payed BOOLEAN NOT NULL,
            dniClient TEXT NOT NULL,
            FOREIGN KEY (dniClient) REFERENCES clients(dni)
        );

    `

    db.prepare(sql).run()
}

const addClient = () => {
    const sql = `
        INSERT INTO clients (name, dni, phone, course)
        VALUES (@name, @dni, @phone, @course);
    `
    return db.prepare(sql).run()
}

const addPay = () => {
    const sql = `
        INSERT INTO pay (date, amount, payed, dniClient)
        VALUES (@date, @amount, @payed, @dniClient);
    `
    return db.prepare(sql).run()
}