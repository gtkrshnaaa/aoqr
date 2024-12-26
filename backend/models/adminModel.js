// backend/models/adminModel.js

const db = require('../config/db');

exports.findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0];
};
