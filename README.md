# Praktikan Web

Web portal modern untuk manajemen dan digitalisasi link penting bagi praktikan. Dibangun dengan **Laravel 12**, **React 19**, dan **Tailwind CSS 4**.

> [!NOTE]
> Project ini merupakan **project pribadi full-stack** yang dikembangkan untuk mendukung kegiatan di **Laboratorium Manajemen Lanjut**, tempat saya mengajar dan menjabat sebagai **SPV Programmer**.

## 🎯 Tujuan Project

Platform ini dirancang sebagai **pusat referensi (centralized hub)** untuk mempermudah praktikan mengakses semua informasi dan tautan penting dalam satu wadah terpusat. Dengan adanya platform ini, praktikan dapat dengan mudah menemukan:
- Materi pembelajaran dan modul praktikum.
- Link pendaftaran dan administrasi.
- Tautan pengumpulan tugas dan laporan.
- Informasi penting lainnya tanpa harus mencari secara manual di tumpukan pesan atau dokumen.

## 🚀 Fitur Utama

- **Modern UI/UX**: Tampilan bersih dan responsif menggunakan Tailwind CSS 4.
- **Fast Navigation**: Menggunakan Inertia.js untuk pengalaman Single Page Application (SPA).
- **Smooth Animations**: Interaksi yang menarik dengan Framer Motion.
- **Dynamic Content**: Manajemen link yang mudah dan terorganisir.
- **Optimized for Speed**: Build tool menggunakan Vite 7 untuk performa maksimal.

## 🔐 Manajemen Admin

Project ini berfungsi sebagai **Frontend/Public-facing** site. Semua data link dan kategori dikelola melalui panel admin khusus yang berada di repositori terpisah:

- **Admin Repository**: [Website-Link-Penting](https://github.com/MasaYama03/Website-Link-Penting.git)
- **Fitur yang dapat diatur oleh Admin**:
  - **Manajemen Kategori & Link**: 
    - Mengatur kategori (nama, ikon, warna, urutan).
    - Mengatur link (judul, URL, ikon, status aktif, urutan).
    - **Sub Grouping**: Link dapat dikelompokkan ke dalam "Sub Group" (misalnya: Kelompok A, Kelompok B) untuk tampilan yang lebih rapi pada mode "Direct".
  - **Hero Slideshow (Banner)**: 
    - Upload gambar banner utama.
    - **Granular Visibility**: Setiap gambar banner dapat diatur visibilitasnya: hanya untuk **Asisten**, hanya untuk **Praktikan**, atau **Keduanya (Both)**.
    - Toggle On/Off Slideshow Global & Pengaturan Delay (detik) untuk kecepatan transisi antar gambar.
  - **Kontak SPV Dinamis**: 
    - Menampilkan daftar kontak SPV (Nama, Nomor HP, Lokasi Tugas) secara otomatis berdasarkan data User di database admin.
    - Admin cukup mencentang opsi "Tampilkan Nomor HP" pada profil User (SPV) untuk memunculkannya di web tanpa perlu mengubah kode.
  - **Konfigurasi Sosial Media**: Mengatur link Twitter, Instagram, dan Email resmi laboratorium.
  - **Mode Tampilan (Display Mode)**: 
    - Memilih antara mode **"Folder"** (pengelompokan per kategori) atau **"Direct"** (list semua link langsung).
    - **Auto-fallback**: Sistem otomatis beralih ke mode Folder jika terdapat lebih dari satu kategori untuk menjaga kerapihan tampilan.

## 🛠️ Tech Stack

- **Backend**: [Laravel 12](https://laravel.com/)
- **Frontend**: [React 19](https://react.dev/)
- **Adapter**: [Inertia.js](https://inertiajs.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)

## 📦 Instalasi

Ikuti langkah-langkah berikut untuk menjalankan project di lingkungan lokal:

1. **Clone repositori**
   ```bash
   git clone https://github.com/username/praktikan-web.git
   cd praktikan-web
   ```

2. **Instal dependensi PHP**
   ```bash
   composer install
   ```

3. **Instal dependensi JavaScript**
   ```bash
   npm install
   ```

4. **Konfigurasi Environment**
   Salin file `.env.example` menjadi `.env` dan sesuaikan konfigurasi database Anda.
   ```bash
   cp .env.example .env
   ```

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Migrasi Database & Seeder**
   ```bash
   php artisan migrate --seed
   ```

## 🖥️ Pengembangan

Jalankan server pengembangan:

```bash
# Menjalankan server Laravel
php artisan serve

# Menjalankan Vite (untuk frontend development)
npm run dev
```

Project sekarang dapat diakses melalui `http://localhost:8000`.

## 📄 Lisensi

Project ini bersifat open-source dan dilisensikan di bawah [MIT license](https://opensource.org/licenses/MIT).
