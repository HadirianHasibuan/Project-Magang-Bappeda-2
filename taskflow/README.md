# TaskFlow — Task Management App

Aplikasi manajemen task modern berbasis **React + Vite**, dengan Dashboard, Kanban board (drag & drop), Calendar, autentikasi, dark mode, dan tampilan responsive.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Untuk build production:

```bash
npm run build
npm run preview
```

## Login demo

```
Email    : demo@taskflow.app
Password : demo1234
```

Atau buat akun baru lewat halaman **Register**.

> Catatan: proyek ini menggunakan `localStorage` sebagai penyimpanan data (tanpa backend), sehingga cocok untuk demo/prototipe. Untuk produksi, ganti `AuthContext` dan `TaskContext` agar memanggil API/backend sungguhan.

## Struktur folder

```
src/
  components/    # komponen reusable (Sidebar, Topbar, TaskRow, modal, dsb.)
  context/       # AuthContext, TaskContext, ThemeContext
  data/          # seed data demo
  layouts/       # MainLayout (sidebar + topbar + outlet)
  pages/         # Login, Register, Dashboard, MyTasks, Kanban, Calendar, Profile, Settings
  utils/         # helper localStorage
  index.css      # design system (tokens warna, tipografi, komponen)
```

## Fitur

- Login & Register (localStorage, siap diganti ke API)
- Dashboard: total task, To Do, In Progress, Done, Terlambat, grafik donut progress
- CRUD task lengkap (judul, deskripsi, status, prioritas, deadline, penanggung jawab)
- Kanban board dengan drag & drop antar kolom status
- Search & filter (status, prioritas) di My Tasks dan pencarian global di topbar
- Calendar bulanan menampilkan deadline task per hari
- Profile user & Settings (dark mode, preferensi notifikasi)
- Notifikasi sederhana untuk task yang jatuh tempo hari ini / terlambat
- Dark mode dengan token warna terpisah
- Responsive: sidebar menjadi drawer di layar mobile
