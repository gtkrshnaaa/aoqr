// backend/models/adminModel.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../../models/adminModel');
require('dotenv').config();

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findByEmail(email);

        if (!admin) {
            return res.status(404).json({ message: 'Admin tidak ditemukan' });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password salah' });
        }

        // Buat token JWT
        const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: 'Login berhasil', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
};
