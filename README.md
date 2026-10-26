# Salam Kopi - Kedai Kopi & Specialty Coffee Nusantara

Website resmi **Salam Kopi Indonesia** (https://ajirahayu.ai.studio/). Platform katalog kopi nusantara, manual brew, keranjang belanja, checkout QRIS, kasir (POS), dan dasbor finansial kafe.

---

## 📥 Fitur Download Source Code (HTML, CSS, JS) untuk GitHub

Website ini kini dilengkapi fitur **Export & Download Source Code** mandiri (zero-dependency) yang bisa diakses langsung dari website:
1. **Tombol "Export GitHub" di Navbar atas**.
2. **Tombol "Siap Upload GitHub" di Hero banner**.
3. **Floating button "Download Kode GitHub" di pojok kiri bawah**.
4. **Banner "Ingin Upload Website Ini ke Akun GitHub Anda?" di Footer**.

### Format File yang Bisa Diunduh:
- **`salam-kopi-github-package.zip`**: Paket lengkap berisi `index.html`, `style.css`, `app.js`, dan `README.md`.
- **Download satuan**:
  - `index.html` (Struktur semantic HTML5 responsif)
  - `style.css` (Gaya visual warm coffee aesthetic)
  - `app.js` (Logika interaktif keranjang belanja, kuis barista, checkout, dan POS)
  - `README.md` (Dokumentasi lengkap)

---

## 🚀 Panduan Upload ke GitHub & Aktifkan Website Gratis di GitHub Pages

### Cara 1: Upload Langsung via Browser (Mudah & Cepat)
1. Buka [github.com/new](https://github.com/new).
2. Buat repository baru, misalnya dengan nama `salam-kopi`. Pilih **Public**.
3. Klik link **"uploading an existing file"**.
4. Tarik dan lepas (drag-and-drop) file `index.html`, `style.css`, `app.js`, dan `README.md`.
5. Klik **Commit changes**.
6. Masuk ke tab **Settings** > **Pages**.
7. Pada menu **Branch**, pilih **main** / **root** dan klik **Save**.
8. Dalam 1-2 menit, website Anda sudah aktif online di:
   `https://<username-github>.github.io/salam-kopi/`

### Cara 2: Lewat Git Terminal (CLI)
```bash
git init
git add .
git commit -m "feat: initial commit website Salam Kopi"
git branch -M main
git remote add origin https://github.com/<username-github>/salam-kopi.git
git push -u origin main
```

---

## 🛠️ Pengembangan Lokal (Node.js & Vite)
Jika Anda ingin mengembangkan versi React + Vite + TypeScript:
```bash
# Instalasi dependencies
npm install

# Jalankan server pengembangan
npm run dev

# Bangun versi produksi
npm run build
```

---

Dibuat dengan ❤️ untuk pecinta kopi Nusantara.
