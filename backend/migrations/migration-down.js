// migrations/migration-down.js
const db = require('../config/db');

async function migrateDown() {
    try {
        // Drop tabel dalam urutan yang aman
        await db.query('DROP TABLE IF EXISTS objects;');
        await db.query('DROP TABLE IF EXISTS categories;');
        await db.query('DROP TABLE IF EXISTS admins;');

        console.log('Migrasi down berhasil untuk semua tabel.');
    } catch (error) {
        console.error('Error saat migrasi down:', error);
    } finally {
        db.end();
    }
}

migrateDown();
