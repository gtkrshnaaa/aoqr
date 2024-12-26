// backend/app.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/admin/adminAuthRoutes');
const categoryRoutes = require('./routes/admin/adminCategoryRoutes');
const objectRoutes = require('./routes/admin/adminObjectRoutes');
const publicObjectRoutes = require('./routes/public/publicObjectRoutes');

const app = express();

// Konfigurasi CORS
app.use(cors({
    origin: 'http://localhost:3000', // Ubah jika frontend berada di URL yang berbeda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Perlu jika ingin mengirim cookie atau header khusus
}));

app.use(express.json());

// Middleware untuk mengakses folder 'uploads' sebagai public static files
app.use('/uploads', express.static('public/uploads'));
app.use('/qrcode', express.static('public/qrcode'));

// Menambahkan routes untuk admin
app.use('/api/admin', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/objects', objectRoutes);

// Menambahkan routes untuk public
app.use('/api/public', publicObjectRoutes);

module.exports = app;
