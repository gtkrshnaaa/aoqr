### **Akses Domain Langsung Tanpa Port**
Supaya nggak perlu menyebutkan port saat akses domain, ada dua opsi:

---

#### 1. **Gunakan Reverse Proxy (Recommended)**
   - Dengan **NGINX** atau **Apache**, kamu bisa mengarahkan domain ke port aplikasi kamu.
   - Contoh: Kamu punya backend di `3000` dan frontend di `3001`. Setting NGINX supaya:
     - `http://yourdomain.com` → Port `3001` (Frontend)
     - `http://yourdomain.com/api` → Port `3000` (Backend)

     **Konfigurasi NGINX:**
     ```nginx
     server {
         listen 80;
         server_name yourdomain.com;

         # Arahkan ke frontend
         location / {
             proxy_pass http://127.0.0.1:3001;
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         }

         # Arahkan ke backend
         location /be {
             proxy_pass http://127.0.0.1:3000;
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         }
     }
     ```

   Setelah konfigurasi ini, kamu bisa akses:
   - Frontend: `http://yourdomain.com`
   - Backend: `http://yourdomain.com/be`

---

#### 2. **Pindahkan Aplikasi ke Port Default (Port 80 atau 443)**
   - Port **80** (HTTP) atau **443** (HTTPS) adalah **port default** untuk web.
   - Kalau backend atau frontend kamu dijalankan di port-port ini, kamu nggak perlu tulis port saat akses domain.

     **Langkah-langkah:**
     - Ubah aplikasi kamu supaya berjalan di port `80` (HTTP):
       ```javascript
       app.listen(80, '0.0.0.0', () => {
           console.log('Server running on port 80');
       });
       ```
     - Kalau mau pakai HTTPS (port `443`), butuh sertifikat SSL. Kamu bisa pakai **Let's Encrypt** gratis.

     **Catatan:**
     - Jalankan aplikasi di port `80/443` butuh akses **root**, jadi gunakan `sudo`.
     - Hanya satu aplikasi yang bisa berjalan di satu port, jadi hati-hati kalau ada layanan lain yang sudah pakai port ini (misal NGINX/Apache).

---

Kalau kamu pakai cara pertama (reverse proxy), domain tetap bisa di-pointing langsung tanpa perlu pusing lagi soal port di URL. Kalau cara kedua, pastikan aplikasi pakai port default. Kalau bingung mau pilih yang mana, aku bantu sesuaikan sama kebutuhan servermu! 😊