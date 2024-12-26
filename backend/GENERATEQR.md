# FLOW MENGGENERATE QR CODE

Untuk flow pembuatan QR code yang mengarah ke halaman tertentu di frontend, biasanya backend perlu tau URL frontend-nya. Dengan Express di backend, kamu bisa hardcode base URL frontend tersebut, lalu tinggal ditambah dengan ID data yang relevan. Berikut gambaran flownya:

1. **Set Base URL**: Di backend, tentukan base URL frontend yang mengarah ke halaman detail data yang mau dituju. Misalnya, kalo URL frontend untuk melihat data detail adalah `https://example.com/data/{id}`, kamu bisa hardcode `https://example.com/data/` sebagai base URL.

2. **Generate URL Berdasarkan ID**: Saat data baru diinput atau diupdate di dashboard admin, backend Express bisa otomatis generate URL lengkap dengan ID data, misalnya `https://example.com/data/123`.

3. **Generate QR Code**: Gunakan library seperti `qrcode` di Node.js. URL yang udah lengkap (base URL + ID) di-generate jadi QR code. Contoh kodenya:

   ```javascript
   const QRCode = require('qrcode');

   const generateQRCode = async (id) => {
     const baseURL = 'https://example.com/data/';
     const fullURL = `${baseURL}${id}`;
     
     try {
       const qrCodeDataURL = await QRCode.toDataURL(fullURL); // Menghasilkan QR code dalam bentuk base64
       return qrCodeDataURL;
     } catch (err) {
       console.error(err);
     }
   };
   ```

4. **Simpan atau Tampilkan QR Code**: Setelah QR code-nya jadi, kamu bisa return QR code dalam format base64 ke frontend untuk ditampilkan langsung atau disimpan ke database kalo perlu diakses lagi nanti.

5. **Dashboard Admin untuk Input Data**: Admin tinggal input data di dashboard, lalu backend generate QR code berdasarkan ID data tersebut, dan QR code ditampilkan di halaman admin.

Dengan flow ini, setiap QR code akan selalu mengarah ke halaman yang sesuai di frontend.

---



# MENAMBAHKAN LOGO DI TENGAH QR CODE

QR code bisa ditambahkan logo di tengahnya untuk branding, termasuk logo perusahaan. Dengan `qrcode` package di Node.js, kamu mungkin perlu sedikit modifikasi, karena library ini tidak langsung support logo. Jadi, biasanya langkahnya adalah:

1. **Generate QR Code Tanpa Logo**: Generate QR code dulu dalam bentuk gambar atau buffer, tanpa logo.

2. **Tambahkan Logo ke QR Code**: Gunakan library tambahan seperti `jimp` atau `sharp` di Node.js untuk overlay logo ke tengah QR code yang udah digenerate tadi.

Contoh kodenya pake kombinasi `qrcode` dan `jimp`:

```javascript
const QRCode = require('qrcode');
const Jimp = require('jimp');

async function generateQRCodeWithLogo(id) {
  const baseURL = 'https://example.com/data/';
  const fullURL = `${baseURL}${id}`;

  try {
    // Generate QR code sebagai buffer (gambar dalam format PNG)
    const qrCodeBuffer = await QRCode.toBuffer(fullURL, {
      errorCorrectionLevel: 'H', // Pakai tingkat error correction tinggi biar logo nggak ganggu scan QR
      width: 300,
      margin: 1,
    });

    // Load QR code dan logo
    const qrImage = await Jimp.read(qrCodeBuffer);
    const logo = await Jimp.read('path/to/logo.png'); // Path file logo

    // Resize logo supaya pas di tengah
    logo.resize(50, 50); // Ukuran logo bisa disesuaikan

    // Posisi logo di tengah QR code
    const posX = (qrImage.bitmap.width / 2) - (logo.bitmap.width / 2);
    const posY = (qrImage.bitmap.height / 2) - (logo.bitmap.height / 2);

    // Tempel logo di tengah QR code
    qrImage.composite(logo, posX, posY);

    // Convert QR code with logo jadi base64
    const qrCodeWithLogoBase64 = await qrImage.getBase64Async(Jimp.MIME_PNG);
    
    return qrCodeWithLogoBase64;
  } catch (err) {
    console.error('Error generating QR Code with logo:', err);
  }
}
```

Pada contoh ini:
- QR code di-generate dengan `QRCode.toBuffer()` dan disimpan sebagai buffer.
- `Jimp` digunakan untuk menempelkan logo di tengah QR code.
- `errorCorrectionLevel` disetel ke `H` (tinggi) agar QR code tetap bisa discan meskipun ada logo.

Setelah jadi, `qrCodeWithLogoBase64` bisa kita tampilkan di frontend atau simpan.