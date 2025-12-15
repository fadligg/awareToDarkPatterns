# Dark Pattern Awareness Platform 🕵️‍♂️🚫

**Dark Pattern Awareness** adalah platform edukasi interaktif berbasis web yang bertujuan untuk meningkatkan literasi digital pengguna internet dan pengembang (*developer*) mengenai *Deceptive Design Patterns* (Pola Desain Menipu/Gelap).

Aplikasi ini menggabungkan dokumentasi teknis, simulasi interaktif, dan gamifikasi untuk membantu pengguna mengenali dan menghindari manipulasi antarmuka digital.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Daftar Isi
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Persyaratan Sistem](#-persyaratan-sistem-prerequisites)
- [Panduan Instalasi](#-panduan-instalasi-setup-guide)
- [Cara Menjalankan](#-cara-menjalankan-aplikasi)
- [Tim Pengembang](#-tim-pengembang)

---

## ✨ Fitur Utama

### 🛠 A. Developer Mode
Panduan teknis mendalam yang dikhususkan untuk pengembang UI/UX dan Product Designer.
- **Dokumentasi Teknis:** Definisi mendalam tentang 16 jenis *dark pattern*.
- **Ethical Guidelines:** Panduan implementasi kode dan desain yang etis.
- **Library Reference:** Katalog pola desain yang harus dihindari sesuai standar hukum (UU ITE/GDPR).

### 👥 B. User Mode
Edukasi ramah pengguna untuk masyarakat umum agar lebih waspada.
- **Simulasi Interaktif:** Kartu interaktif yang membandingkan "Dark Pattern" vs "Ethical Design" secara visual.
- **Tips Pencegahan:** Strategi praktis menghindari jebakan biaya tersembunyi, *forced action*, dll.
- **Bahasa Sederhana:** Penjelasan non-teknis yang mudah dipahami.

### 🎮 C. Game Quiz & Leaderboard
Uji pemahaman pengguna melalui kuis interaktif yang menyenangkan.
- **Sistem Poin:** Dapatkan skor untuk setiap jawaban benar.
- **Leaderboard Real-time:** Papan peringkat Harian dan Bulanan untuk memacu kompetisi.
- **Feedback Langsung:** Pembahasan instan muncul setelah menjawab soal.

---

## 💻 Teknologi yang Digunakan

Aplikasi ini dibangun dengan stack modern **Monolith-Inertia**:

- **Backend:** [Laravel 10/11](https://laravel.com) (PHP Framework)
- **Frontend:** [React.js](https://reactjs.org) (JavaScript Library)
- **Adapter:** [Inertia.js](https://inertiajs.com) (Penghubung Laravel & React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Database:** MySQL
- **Build Tool:** Vite

---

## ⚙️ Persyaratan Sistem (Prerequisites)

Sebelum melakukan instalasi, pastikan perangkat kamu telah terinstal:

* PHP >= 8.2
* Composer
* Node.js & NPM
* MySQL Database

---

## 🚀 Panduan Instalasi (Setup Guide)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal (Localhost):

### Langkah 1: Clone Repositori
Buka terminal dan jalankan perintah:

```bash
git clone [https://github.com/fadligg/awareToDarkPatterns.git](https://github.com/fadligg/awareToDarkPatterns.git)
cd dark-pattern-awareness
```

### Langkah 2: Install Dependencies 
```bash
composer install
npm install
```
### Langkah 3: Konfigurasi Environment
```bash
cp .env.example .env
```
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dark_pattern_db
DB_USERNAME=root
DB_PASSWORD=
```
### Langkah 4: Generate Key & Migrasi Database
```bash
php artisan key:generate
php artisan migrate
php artisan db:seed
```
## ⏯️ Cara Menjalankan Aplikasi

### Terminal 1
```bash
php artisan serve
```
### Terminal 2
```bash
npm run dev
```

## 👥 Tim Pengembang

Berikut adalah kontributor yang mengerjakan proyek **Dark Pattern Awareness**:

| Nama Anggota | Peran (*Role*) | Kontak |
| :--- | :--- | :--- |
| **Fadli Haidar Nugraha** | Fullstack Developer | [@dleehh_](https://instagram.com/dleehh_) |
| **M. Dyo Rijki Fadillah** | UI/UX Designer | [@dyoo.rf](https://instagram.com/dyoo.rf) |
| **Irsyad Adfiansha Hidayat** | UI/UX Designer | [@adfsh000](https://instagram.com/adfsh000) |
| **M. Dantha Arianvasya** | Content Researcher | [@danthaarian](https://instagram.com/danthaarian) |

