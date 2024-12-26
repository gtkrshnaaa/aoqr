# Semantik Commit untuk Repo ini
Semantik commit yang digunakan di repo ini adalah *Conventional Commits*, yang punya beberapa kata kunci atau "type" untuk mendeskripsikan jenis perubahan. Ini beberapa yang paling umum:

1. **feat**: Penambahan fitur baru atau peningkatan yang signifikan.
   - `feat: menambahkan fitur pencarian`

2. **fix**: Perbaikan bug atau error di aplikasi.
   - `fix: memperbaiki error saat login`

3. **docs**: Perubahan pada dokumentasi, seperti README atau API docs.
   - `docs: memperbarui panduan penggunaan API`

4. **style**: Perubahan yang tidak memengaruhi logika program, seperti format kode, spasi, titik koma, dll.
   - `style: format ulang kode sesuai standar`

5. **refactor**: Perubahan pada kode yang tidak mengubah fungsi atau perilaku aplikasi, biasanya untuk memperbaiki struktur atau meningkatkan kualitas kode.
   - `refactor: refaktor fungsi untuk lebih efisien`

6. **perf**: Perubahan yang meningkatkan performa aplikasi.
   - `perf: optimasi query database untuk load lebih cepat`

7. **test**: Penambahan atau perubahan pada kode pengujian (unit test, integration test, dll).
   - `test: menambahkan tes untuk validasi input user`

8. **chore**: Perubahan kecil yang bersifat administratif atau update rutin, misalnya update dependencies atau task build, yang tidak memengaruhi kode aplikasi.
   - `chore: memperbarui versi library`

9. **build**: Perubahan yang berhubungan dengan sistem build, seperti script build, atau tools yang digunakan (misalnya Webpack, Babel, dll).
   - `build: konfigurasi ulang Webpack untuk split bundling`

10. **ci**: Perubahan yang terkait dengan konfigurasi CI/CD (Continuous Integration/Continuous Deployment) atau penyesuaian pipeline.
   - `ci: update pipeline untuk lingkungan staging`

11. **revert**: Membatalkan perubahan dari commit sebelumnya.
   - `revert: membatalkan commit fitur registrasi`

12. **hotfix**: Perbaikan cepat atau kritis yang perlu segera dilakukan, sering kali langsung di production.
   - `hotfix: perbaiki validasi input pada form registrasi`

13. **merge**: Digunakan saat menggabungkan branch, biasanya disertakan dengan pesan yang menunjukkan branch yang digabungkan.
   - `merge: gabungkan branch develop ke main`

