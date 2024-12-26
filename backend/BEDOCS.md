Berikut struktur folder untuk aplikasi Express.js yang dilengkapi dengan file-file yang dibutuhkan, termasuk file migrasi, konfigurasi database, dan pengaturan route dasar:

```plaintext
backend
├── app.js
├── BEDOCS.md
├── config
│   └── db.js
├── controllers
│   └── adminAuthController.js
├── GENERATEQR.md
├── migrations
│   ├── migration-down.js
│   └── migration-up.js
├── models
│   └── adminModel.js
├── package.json
├── package-lock.json
├── routes
│   └── adminAuthRoutes.js
└── server.js
```

### Penjelasan Struktur Folder

- **config/db.js**: File ini berisi konfigurasi koneksi database MariaDB, sehingga aplikasi dapat terhubung ke database.

- **controllers/adminAuthController.js**: Controller untuk menangani logika autentikasi admin, seperti login dan validasi token.

- **migrations/**: Folder ini berisi file migrasi. `migration-up.js` untuk membuat tabel, dan `migration-down.js` untuk menghapus tabel.

- **models/adminModel.js**: File ini menyimpan fungsi untuk melakukan operasi database khusus tabel `admins`. 

- **routes/adminAuthRoutes.js**: Berisi definisi route untuk autentikasi, misalnya `POST /login` untuk login admin.

- **.env**: File untuk menyimpan konfigurasi yang sensitif seperti `DB_HOST`, `DB_USER`, `DB_PASS`, dll.

- **app.js**: File setup Express.js, termasuk middleware dan pengaturan route.

- **server.js**: Entry point untuk menjalankan server Express.js.

