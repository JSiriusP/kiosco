import { db } from './db';

export const addClient = (name, dni, phone, course) => {
    try {
        db.runSync(
            'INSERT INTO clients (name, dni, phone, course) VALUES (?, ?, ?, ?)',
            [name, dni, phone, course]
        );
        return { success: true };
    } catch (error) {
        console.error("Error adding client:", error);
        return { success: false, error: error.message };
    }
};

export const getClients = () => {
    try {
        const result = db.getAllSync('SELECT * FROM clients');
        return result;
    } catch (error) {
         console.error("Error getting clients:", error);
         return [];
    }
};

export const searchClients = (query) => {
    try {
        const sql = `SELECT * FROM clients WHERE name LIKE ? OR dni LIKE ?`;
        const searchPattern = `%${query}%`;
         const result = db.getAllSync(sql, [searchPattern, searchPattern]);
        return result;
    } catch (error) {
         console.error("Error searching clients:", error);
         return [];
    }
};

export const addPayment = (amount, description, isPaid, date, clientId) => {
     try {
        db.runSync(
            'INSERT INTO payments (amount, description, isPaid, date, clientId) VALUES (?, ?, ?, ?, ?)',
            [amount, description, isPaid ? 1 : 0, date, clientId]
        );
        return { success: true };
    } catch (error) {
        console.error("Error adding payment:", error);
        return { success: false, error: error.message };
    }
}

export const getPayments = () => {
    try {
        const result = db.getAllSync('SELECT * FROM payments');
        return result;
    } catch (error) {
         console.error("Error getting payments:", error);
         return [];
    }
}

export const getPaymentsByClient = (clientDni) => {
    try {
        const sql = `SELECT * FROM payments WHERE clientId = ? ORDER BY date DESC`;
        const result = db.getAllSync(sql, [clientDni]);
        return result;
    } catch (error) {
        console.error("Error getting payments for client:", error);
        return [];
    }
}