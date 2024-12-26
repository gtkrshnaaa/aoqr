// migrations/migration-up.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function migrateUp() {
    try {
        // Buat tabel admins
        await db.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Insert data admin default
        const passwordHash = await bcrypt.hash('admin_password', 10);
        await db.query(`INSERT INTO admins (email, password) VALUES ('admin@example.com', ?)`, [passwordHash]);

        

        // Buat tabel categories
        await db.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);


        // // Buat tabel objects
        // await db.query(`
        //     CREATE TABLE IF NOT EXISTS objects (
        //         id INT AUTO_INCREMENT PRIMARY KEY,
        //         name VARCHAR(100) NOT NULL,
        //         image_url JSON,
        //         qr_image_url VARCHAR(255) NULL,
        //         location VARCHAR(100),
        //         category_id INT,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                
        //         description_english TEXT,

        //         description_indonesian TEXT NULL,

        //         description_chinese_simp TEXT NULL,

        //         description_japanese TEXT NULL,

        //         description_korean TEXT NULL,

        //         description_russian TEXT NULL,

        //         description_spanish TEXT NULL,

        //         description_dutch TEXT NULL,

        //         CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        //     );
        // `);


        // Buat tabel objects
        await db.query(`
            CREATE TABLE IF NOT EXISTS objects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                image_url JSON,
                qr_image_url VARCHAR(255) NULL,
                category_id INT,
                view_count INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                
                name_english VARCHAR(100) NOT NULL,
                location_english VARCHAR(100) NOT NULL,
                description_english TEXT NOT NULL,

                name_indonesian VARCHAR(100) NULL,
                location_indonesian VARCHAR(100) NULL,
                description_indonesian TEXT NULL,

                name_chinese_simp VARCHAR(100) NULL,
                location_chinese_simp VARCHAR(100) NULL,
                description_chinese_simp TEXT NULL,

                name_japanese VARCHAR(100) NULL,
                location_japanese VARCHAR(100) NULL,
                description_japanese TEXT NULL,

                name_korean VARCHAR(100) NULL,
                location_korean VARCHAR(100) NULL,
                description_korean TEXT NULL,

                name_russian VARCHAR(100) NULL,
                location_russian VARCHAR(100) NULL,
                description_russian TEXT NULL,

                name_spanish VARCHAR(100) NULL,
                location_spanish VARCHAR(100) NULL,
                description_spanish TEXT NULL,

                name_dutch VARCHAR(100) NULL,
                location_dutch VARCHAR(100) NULL,
                description_dutch TEXT NULL,

                CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
            );
        `);

        console.log('Migrasi up berhasil untuk semua tabel.');
    } catch (error) {
        console.error('Error saat migrasi up:', error);
    } finally {
        db.end();
    }
}

migrateUp();

