const db = require('../config/db');

exports.create = async (name) => {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    return result.insertId;
};

exports.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
};

exports.update = async (id, name) => {
    await db.query('UPDATE categories SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [name, id]);
};

exports.delete = async (id) => {
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
};
