
---

# **Know Your ITB**

## **Deskripsi Aplikasi**

**Know Your ITB** adalah sebuah aplikasi berbasis web yang bertujuan untuk membantu mahasiswa baru dalam menemukan Unit Kegiatan Mahasiswa (UKM) yang paling sesuai dengan minat, bakat, dan kepribadian mereka. Selain itu, aplikasi ini juga memberikan opsi untuk mencari tahu tentang divisi-divisi dalam badan Himpunan Mahasiswa Informatika, sehingga pengguna dapat menemukan peran yang paling cocok di organisasi tersebut.

### **Fitur Utama:**
- **Menu Utama**: Sistem menampilkan menu utama yang memungkinkan pengguna memilih fitur prediksi yang diinginkan, seperti prediksi UKM atau prediksi divisi HMIF.
- **Penyimpanan Jawaban Sementara**: Sistem menyimpan jawaban pengguna untuk setiap pertanyaan secara sementara, kemudian menampilkan pertanyaan berikutnya.
- **Proses Prediksi**: Sistem memproses semua jawaban yang diberikan untuk menghasilkan top 5 prediksi sesuai dengan model yang telah ditentukan.
- **Informasi Detail**: Sistem menampilkan informasi lebih lanjut mengenai top 5 prediksi atau UKM/divisi lainnya berdasarkan pilihan pengguna.
- **Admin Login dan Dashboard**: Admin dapat masuk ke sistem untuk mengakses dashboard dan mengedit data yang diperlukan untuk pengelolaan aplikasi.

## **Teknologi yang Digunakan**

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth-000000?style=for-the-badge&logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
</div>

- **Frontend Framework**: Next.js
- **Frontend Library**: React.js
- **Styling**: Tailwind CSS
- **Bahasa Pemrograman**: TypeScript
- **ORM**: Prisma
- **Autentikasi**: NextAuth
- **Database**: PostgreSQL
- **Backend Framework**: Python (Flask)

## **Struktur Program**

```plaintext
|-- prisma/
|   |-- schema.prisma       # Skema basis data Prisma
|
|-- backend/
|   |-- index.py            # Backend (Flask)
|   |-- models              # Kumpulan model prediksi
|
|-- src/
|   |-- app/                # Halaman Next.js
|   |-- components/         # Komponen UI Reusable
|   |-- libs/               # Konfigurasi database, auth, dan utilitas umum
|   |-- utils/              # Utilitas pembantu
|   |-- types/              # Interface type untuk TypeScript
|
|-- public/                 # Berkas statis (gambar, favicon, dll)
|
|
|-- .env                    # Variabel lingkungan
|-- package.json            # Daftar dependensi dan skrip
|-- README.md               # Dokumentasi proyek
```

## **Cara Menjalankan Program**

### **1. Instalasi Requirement**
Pastikan kamu sudah menginstal Node.js, Python **(Python haruslah memenuhi ketentuan 3.9 <= version < 3.12)**, dan PostgreSQL. Lalu, ikuti langkah-langkah berikut:

```bash
# Clone repository
git clone https://github.com/l0stplains/know-your-itb.git

# Masuk ke direktori proyek
cd know-your-itb

# Instal dependensi frontend
npm install
# atau
pnpm install

# Migrasi basis data jika belum ada file migration
npx prisma migrate dev

# Generate klien Prisma
npx prisma generate

# Install pnpm
npm install -g pnpm

# Install depedensi tersisa
pnpm install

# Jalankan server juga backend
npm run dev
```

### **2. Menjalankan Aplikasi**
Jalankan frontend dan backend:

```bash
# Menjalankan front end dan juga back end
npm run dev

# Menjalankan front end saja (beberapa fitur tidak akan berjalan)
npx next dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat aplikasi.

### **3. Konfigurasi .env**
Tambahkan variabel lingkungan yang diperlukan ke dalam file `.env`. Contoh:

```
DATABASE_URL="postgresql://user:password@localhost:5432/nama-database"
NEXTAUTH_URL=http://localhost:3000
SECRET=your_secret_key
```

## **Anggota Kelompok**

| Nama        | Peran          |
|-------------|----------------|
| Devon Wiraditya Tanumihardja       | Product Manager |
| Desati Dinda Saraswati       | UI/UX Designer |
| Aldoy Fauzan Avanza        |  Software Developer (Front-end)    |
| Ahmad Evander Ruizhi Xavier       |  Software Developer (Front-end)    |
| Nayla Zahira        |  Software Developer (Front-end)    |
| Aryo Bama Wiratama        |  Software Developer (Front-end)    |
| Refki Alfarizi        |  Software Developer (Back-end)    |
| Dhafin Faidhulhaq        |  Game Developer (Tester)   |
| Qodri Azkarayan        |  Data Scientist    |
| William Andrian Dharma T        |  Data Scientist    |


## **Referensi Belajar**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org/getting-started/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Flask Documentation](https://flask.palletsprojects.com/en/2.0.x/)

---

