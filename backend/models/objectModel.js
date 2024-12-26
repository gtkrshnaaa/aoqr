// backend/models/objectModel.js

const db = require('../config/db');


// exports.create = async (
//     name, image_url, location, category_id, description_english, description_indonesian, description_chinese_simp, description_japanese, description_korean, description_russian, description_spanish, description_dutch) => {
//     const [result] = await db.query(
//         'INSERT INTO objects (name, image_url, location, category_id, description_english, description_indonesian, description_chinese_simp, description_japanese, description_korean, description_russian, description_spanish, description_dutch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [name, image_url, location, category_id, description_english, description_indonesian, description_chinese_simp, description_japanese, description_korean, description_russian, description_spanish, description_dutch]
//     );
//     return result.insertId;
// };



exports.create = async (
    image_url, category_id, description_english, location_english, name_english, description_indonesian, location_indonesian, name_indonesian, description_chinese_simp, location_chinese_simp, name_chinese_simp, description_japanese, location_japanese, name_japanese, description_korean, location_korean, name_korean, description_russian, location_russian, name_russian, description_spanish, location_spanish, name_spanish, description_dutch, location_dutch, name_dutch) => {
    const [result] = await db.query(
        'INSERT INTO objects (image_url, category_id, description_english, location_english, name_english, description_indonesian, location_indonesian, name_indonesian, description_chinese_simp, location_chinese_simp, name_chinese_simp, description_japanese, location_japanese, name_japanese, description_korean, location_korean, name_korean, description_russian, location_russian, name_russian, description_spanish, location_spanish, name_spanish, description_dutch, location_dutch, name_dutch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                             [image_url, category_id, description_english, location_english, name_english, description_indonesian, location_indonesian, name_indonesian, description_chinese_simp, location_chinese_simp, name_chinese_simp, description_japanese, location_japanese, name_japanese, description_korean, location_korean, name_korean, description_russian, location_russian, name_russian, description_spanish, location_spanish, name_spanish, description_dutch, location_dutch, name_dutch]
    );
    return result.insertId;
};



// exports.update = async (id, name, description, image_url, location, category_id) => {
//     await db.query(
//         'UPDATE objects SET name = ?, description = ?, image_url = ?, location = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
//         [name, description, image_url, location, category_id, id]
//     );
// };


exports.update = async (
    id, 
    image_url, category_id, 
    description_english, location_english, name_english, 
    description_indonesian, location_indonesian, name_indonesian, 
    description_chinese_simp, location_chinese_simp, name_chinese_simp, 
    description_japanese, location_japanese, name_japanese, 
    description_korean, location_korean, name_korean, 
    description_russian, location_russian, name_russian, 
    description_spanish, location_spanish, name_spanish, 
    description_dutch, location_dutch, name_dutch
) => {
    await db.query(
        `UPDATE objects SET 
            image_url = ?, 
            category_id = ?, 
            description_english = ?, location_english = ?, name_english = ?, 
            description_indonesian = ?, location_indonesian = ?, name_indonesian = ?, 
            description_chinese_simp = ?, location_chinese_simp = ?, name_chinese_simp = ?, 
            description_japanese = ?, location_japanese = ?, name_japanese = ?, 
            description_korean = ?, location_korean = ?, name_korean = ?, 
            description_russian = ?, location_russian = ?, name_russian = ?, 
            description_spanish = ?, location_spanish = ?, name_spanish = ?, 
            description_dutch = ?, location_dutch = ?, name_dutch = ?, 
            updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?`,
        [
            image_url, category_id, 
            description_english, location_english, name_english, 
            description_indonesian, location_indonesian, name_indonesian, 
            description_chinese_simp, location_chinese_simp, name_chinese_simp, 
            description_japanese, location_japanese, name_japanese, 
            description_korean, location_korean, name_korean, 
            description_russian, location_russian, name_russian, 
            description_spanish, location_spanish, name_spanish, 
            description_dutch, location_dutch, name_dutch, 
            id
        ]
    );
};





// exports.findAll = async () => {
//     const [rows] = await db.query('SELECT * FROM objects');
//     return rows;
// };


exports.findAll = async () => {
    const [rows] = await db.query(`
        SELECT objects.*, categories.name AS category_name
        FROM objects
        LEFT JOIN categories ON objects.category_id = categories.id
    `);
    return rows;
};



// exports.findById = async (id) => {
//     const [rows] = await db.query('SELECT * FROM objects WHERE id = ?', [id]);
//     return rows[0];
// };


exports.findById = async (id) => {
    const [rows] = await db.query(`
        SELECT objects.*, categories.name AS category_name
        FROM objects
        LEFT JOIN categories ON objects.category_id = categories.id
        WHERE objects.id = ?
    `, [id]);
    return rows[0];
};



// Update views count
exports.incrementViews = async (id) => {
    await db.query(
        'UPDATE objects SET view_count = view_count + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [id]
    );
};



// Update QR Code URL objek
exports.updateQRCodeUrl = async (id, qrImageUrl) => {
    await db.query(
        'UPDATE objects SET qr_image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [qrImageUrl, id]
    );
};


exports.delete = async (id) => {
    await db.query('DELETE FROM objects WHERE id = ?', [id]);
};
