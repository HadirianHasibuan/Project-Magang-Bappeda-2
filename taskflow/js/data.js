/* ============================================================
   DATA.JS — Data Models, Seed Data, localStorage Utilities
   Sistem Manajemen Tugas Bappeda Bidang I
   ============================================================ */

'use strict';

const DB_KEY = 'taskflow_bappeda_v2';

/* ---- USERS ---- */
const USERS = [
  {
    id: 'kabid1',
    name: 'Kepala Bidang I',
    nip: '196501011990031001',
    jabatan: 'Kepala Bidang Perencanaan Ekonomi & Infrastruktur',
    role: 'kabid',
    email: 'kabid1@bappeda.go.id',
    initials: 'KB',
    color: '#6366f1',
  },
  {
    id: 'subkoor1',
    name: 'Sub-Koordinator Perencanaan',
    nip: '197203152000121001',
    jabatan: 'Sub-Koordinator Perencanaan Ekonomi',
    role: 'subkoor',
    email: 'subkoor@bappeda.go.id',
    initials: 'SK',
    color: '#22d3ee',
  },
  {
    id: 'staf_eja',
    name: 'Pak Eja',
    nip: '198505102010011010',
    jabatan: 'Analis Kebijakan Muda',
    role: 'staf',
    email: 'eja@bappeda.go.id',
    initials: 'EJ',
    color: '#10b981',
  },
  {
    id: 'staf_dwi',
    name: 'Pak Dwi',
    nip: '198710082011011012',
    jabatan: 'Pranata Komputer Ahli Pertama',
    role: 'staf',
    email: 'dwi@bappeda.go.id',
    initials: 'DW',
    color: '#f59e0b',
  },
  {
    id: 'staf_desi',
    name: 'Bu Desi',
    nip: '199001152012012015',
    jabatan: 'Analis Perencanaan',
    role: 'staf',
    email: 'desi@bappeda.go.id',
    initials: 'DS',
    color: '#ec4899',
  },
];

/* ---- RKPD MILESTONES ---- */
const RKPD_MILESTONES = [
  // RKPD Murni
  { id: 'm1', nama: 'Musrenbang Desa / Kelurahan',       bulan: 1, kategori: 'rkpd_murni',      deadline: '2026-01-31' },
  { id: 'm2', nama: 'Musrenbang Kecamatan',               bulan: 2, kategori: 'rkpd_murni',      deadline: '2026-02-28' },
  { id: 'm3', nama: 'Forum SKPD',                         bulan: 3, kategori: 'rkpd_murni',      deadline: '2026-03-31' },
  { id: 'm4', nama: 'Musrenbang Kabupaten / Kota',        bulan: 4, kategori: 'rkpd_murni',      deadline: '2026-04-30' },
  { id: 'm5', nama: 'Musrenbang Provinsi',                bulan: 5, kategori: 'rkpd_murni',      deadline: '2026-05-31' },
  { id: 'm6', nama: 'Penyusunan Rancangan Akhir RKPD',    bulan: 6, kategori: 'rkpd_murni',      deadline: '2026-06-30' },
  { id: 'm7', nama: 'Penetapan RKPD Murni (Perkada)',     bulan: 7, kategori: 'rkpd_murni',      deadline: '2026-07-15' },
  // RKPD Perubahan
  { id: 'm8', nama: 'Evaluasi & Persiapan RKPD Perubahan',bulan: 7, kategori: 'rkpd_perubahan', deadline: '2026-07-31' },
  { id: 'm9', nama: 'Penyusunan Rancangan RKPD Perubahan',bulan: 8, kategori: 'rkpd_perubahan', deadline: '2026-08-15' },
  { id: 'm10',nama: 'Penetapan RKPD Perubahan (Perkada)', bulan: 8, kategori: 'rkpd_perubahan', deadline: '2026-08-31' },
];

/* ---- SEED TASKS ---- */
const SEED_TASKS = [
  // ---- RUTIN MURNI (selesai) ----
  {
    id: 't1', judul: 'Persiapan Dokumen Musrenbang Desa/Kelurahan',
    deskripsi: 'Menyiapkan template, panduan teknis, dan dokumen pendukung untuk pelaksanaan Musrenbang di tingkat Desa dan Kelurahan tahun 2026.',
    jenis: 'rutin', kategori_rutin: 'rkpd_murni', milestone_id: 'm1',
    deadline: '2026-01-31', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_eja',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-01-05T08:00:00' },
      { dari: 'subkoor1', ke: 'staf_eja', waktu: '2026-01-06T09:00:00' },
    ],
    status: 'selesai', file_upload: { nama: 'dokumen_musrenbang_desa.pdf', ukuran: '2.3 MB', waktu: '2026-01-28T10:30:00' },
    approval_status: 'approved', komentar_review: 'Dokumen sudah lengkap dan sesuai format standar.',
    penilaian: { ketepatan: 'tepat', kualitas: 'baik' },
    dibuat_pada: '2026-01-05T07:00:00', diselesaikan_pada: '2026-01-28T10:30:00',
  },
  {
    id: 't2', judul: 'Rekap Hasil Musrenbang Kecamatan',
    deskripsi: 'Menyusun rekapitulasi dan kompilasi hasil Musrenbang Kecamatan dari seluruh wilayah dalam bentuk matriks usulan program.',
    jenis: 'rutin', kategori_rutin: 'rkpd_murni', milestone_id: 'm2',
    deadline: '2026-02-28', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_eja',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-02-01T08:00:00' },
      { dari: 'subkoor1', ke: 'staf_eja', waktu: '2026-02-02T09:00:00' },
    ],
    status: 'selesai', file_upload: { nama: 'rekap_musrenbang_kecamatan.xlsx', ukuran: '1.8 MB', waktu: '2026-02-25T14:00:00' },
    approval_status: 'approved', komentar_review: 'Rekapitulasi lengkap dan terstruktur dengan baik.',
    penilaian: { ketepatan: 'tepat', kualitas: 'baik' },
    dibuat_pada: '2026-02-01T07:00:00', diselesaikan_pada: '2026-02-25T14:00:00',
  },
  {
    id: 't3', judul: 'Penyusunan Bahan Forum SKPD',
    deskripsi: 'Mempersiapkan materi presentasi, tabel prioritas program, dan bahan diskusi untuk Forum SKPD Bidang I.',
    jenis: 'rutin', kategori_rutin: 'rkpd_murni', milestone_id: 'm3',
    deadline: '2026-03-31', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_dwi',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-03-01T08:00:00' },
      { dari: 'subkoor1', ke: 'staf_dwi', waktu: '2026-03-03T09:00:00' },
    ],
    status: 'selesai', file_upload: { nama: 'bahan_forum_skpd_bidang1.pptx', ukuran: '5.1 MB', waktu: '2026-03-28T11:00:00' },
    approval_status: 'approved', komentar_review: 'Materi presentasi sangat baik dan komprehensif.',
    penilaian: { ketepatan: 'tepat', kualitas: 'baik' },
    dibuat_pada: '2026-03-01T07:00:00', diselesaikan_pada: '2026-03-28T11:00:00',
  },
  {
    id: 't4', judul: 'Kompilasi Usulan Musrenbang Kabupaten/Kota',
    deskripsi: 'Mengumpulkan dan mengkompilasi seluruh usulan program dan kegiatan dari hasil Musrenbang tingkat Kabupaten/Kota se-Provinsi.',
    jenis: 'rutin', kategori_rutin: 'rkpd_murni', milestone_id: 'm4',
    deadline: '2026-04-30', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_desi',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-04-01T08:00:00' },
      { dari: 'subkoor1', ke: 'staf_desi', waktu: '2026-04-02T09:00:00' },
    ],
    status: 'selesai', file_upload: { nama: 'kompilasi_usulan_musrenbang.xlsx', ukuran: '3.4 MB', waktu: '2026-04-27T15:00:00' },
    approval_status: 'approved', komentar_review: 'Kompilasi lengkap. Lanjut ke tahap Musrenbang Provinsi.',
    penilaian: { ketepatan: 'tepat', kualitas: 'cukup' },
    dibuat_pada: '2026-04-01T07:00:00', diselesaikan_pada: '2026-04-27T15:00:00',
  },
  {
    id: 't5', judul: 'Koordinasi & Bahan Musrenbang Provinsi',
    deskripsi: 'Menyiapkan bahan koordinasi dan dokumen usulan untuk Musrenbang tingkat Provinsi.',
    jenis: 'rutin', kategori_rutin: 'rkpd_murni', milestone_id: 'm5',
    deadline: '2026-05-31', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_eja',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-05-01T08:00:00' },
      { dari: 'subkoor1', ke: 'staf_eja', waktu: '2026-05-02T09:00:00' },
    ],
    status: 'selesai', file_upload: { nama: 'bahan_musrenbang_provinsi.pdf', ukuran: '4.2 MB', waktu: '2026-05-29T10:00:00' },
    approval_status: 'approved', komentar_review: 'Dokumen sudah sesuai. Presentasi berjalan dengan baik.',
    penilaian: { ketepatan: 'tepat', kualitas: 'baik' },
    dibuat_pada: '2026-05-01T07:00:00', diselesaikan_pada: '2026-05-29T10:00:00',
  },
  // ---- RUTIN MURNI (in progress) ----
  {
    id: 't6', judul: 'Penyusunan Rancangan Akhir RKPD Murni 2027',
    deskripsi: 'Menyusun dokumen Rancangan Akhir RKPD berdasarkan seluruh hasil Musrenbang dan arahan Gubernur. Mencakup matrik rencana program, kerangka pendanaan, dan indikator kinerja.',
    jenis: 'rutin', kategori_rutin: 'rkpd_murni', milestone_id: 'm6',
    deadline: '2026-06-30', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_dwi',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-06-01T08:00:00' },
      { dari: 'subkoor1', ke: 'staf_dwi', waktu: '2026-06-03T09:00:00' },
    ],
    status: 'sedang', file_upload: null,
    approval_status: null, komentar_review: '', penilaian: null,
    dibuat_pada: '2026-06-01T07:00:00', diselesaikan_pada: null,
  },
  {
    id: 't7', judul: 'Persiapan Penetapan RKPD Murni (Perkada)',
    deskripsi: 'Menyiapkan dokumen final RKPD Murni 2027 untuk ditetapkan melalui Peraturan Kepala Daerah, termasuk legal drafting dan harmonisasi.',
    jenis: 'rutin', kategori_rutin: 'rkpd_murni', milestone_id: 'm7',
    deadline: '2026-07-15', dibuat_oleh: 'kabid1', ditugaskan_ke: 'subkoor1',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-07-01T08:00:00' },
    ],
    status: 'belum', file_upload: null,
    approval_status: null, komentar_review: '', penilaian: null,
    dibuat_pada: '2026-07-01T07:00:00', diselesaikan_pada: null,
  },
  // ---- RUTIN PERUBAHAN ----
  {
    id: 't8', judul: 'Evaluasi Pelaksanaan RKPD 2026 (Semester I)',
    deskripsi: 'Melakukan evaluasi terhadap capaian pelaksanaan RKPD 2026 Semester I sebagai dasar penyusunan RKPD Perubahan.',
    jenis: 'rutin', kategori_rutin: 'rkpd_perubahan', milestone_id: 'm8',
    deadline: '2026-07-31', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_desi',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-07-10T08:00:00' },
      { dari: 'subkoor1', ke: 'staf_desi', waktu: '2026-07-11T09:00:00' },
    ],
    status: 'belum', file_upload: null,
    approval_status: null, komentar_review: '', penilaian: null,
    dibuat_pada: '2026-07-10T07:00:00', diselesaikan_pada: null,
  },
  // ---- DIREKTIF ----
  {
    id: 't9', judul: 'Laporan Perkembangan Investasi Daerah Q2 2026',
    deskripsi: 'Gubernur meminta laporan komprehensif perkembangan realisasi investasi daerah Kuartal 2 Tahun 2026 untuk bahan rapat koordinasi nasional di Jakarta.',
    jenis: 'direktif', kategori_rutin: null, milestone_id: null,
    deadline: '2026-08-20', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_eja',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-08-14T09:00:00' },
      { dari: 'subkoor1', ke: 'staf_eja', waktu: '2026-08-14T10:00:00' },
    ],
    status: 'sedang', file_upload: null,
    approval_status: null, komentar_review: '', penilaian: null,
    dibuat_pada: '2026-08-14T08:00:00', diselesaikan_pada: null,
  },
  {
    id: 't10', judul: 'Resume Rapat Koordinasi Bidang Ekonomi',
    deskripsi: 'Membuat resume/notulen resmi hasil rapat koordinasi Bidang Ekonomi tanggal 15 Agustus 2026 yang dihadiri Kepala Bappeda dan para Kabid.',
    jenis: 'direktif', kategori_rutin: null, milestone_id: null,
    deadline: '2026-08-18', dibuat_oleh: 'kabid1', ditugaskan_ke: 'staf_dwi',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-08-15T14:00:00' },
      { dari: 'subkoor1', ke: 'staf_dwi', waktu: '2026-08-15T15:00:00' },
    ],
    status: 'sedang', file_upload: null,
    approval_status: null, komentar_review: '', penilaian: null,
    dibuat_pada: '2026-08-15T13:00:00', diselesaikan_pada: null,
  },
  {
    id: 't11', judul: 'Telaah Staf Kebijakan Sektor Pertanian',
    deskripsi: 'Kepala Bappeda meminta telaah staf terkait kebijakan pengembangan sektor pertanian yang akan dimasukkan dalam dokumen RKPD Perubahan 2026.',
    jenis: 'direktif', kategori_rutin: null, milestone_id: null,
    deadline: '2026-08-25', dibuat_oleh: 'kabid1', ditugaskan_ke: 'subkoor1',
    delegasi_chain: [
      { dari: 'kabid1', ke: 'subkoor1', waktu: '2026-08-16T08:00:00' },
    ],
    status: 'belum', file_upload: null,
    approval_status: null, komentar_review: '', penilaian: null,
    dibuat_pada: '2026-08-16T08:00:00', diselesaikan_pada: null,
  },
];

/* ---- SEED NOTIFICATIONS ---- */
const SEED_NOTIFICATIONS = [
  {
    id: 'n1', untuk_user: 'staf_dwi',
    pesan: '⏰ Tugas "Resume Rapat Koordinasi Bidang Ekonomi" jatuh tempo dalam 2 hari lagi (18 Agustus 2026). Segera selesaikan!',
    tipe: 'deadline', task_id: 't10', dibaca: false, waktu: '2026-08-16T08:00:00',
  },
  {
    id: 'n2', untuk_user: 'subkoor1',
    pesan: '📋 Tugas baru "Telaah Staf Kebijakan Sektor Pertanian" telah didelegasikan oleh Kabid kepada Anda. Deadline: 25 Agustus 2026.',
    tipe: 'delegasi', task_id: 't11', dibaca: false, waktu: '2026-08-16T08:01:00',
  },
  {
    id: 'n3', untuk_user: 'staf_eja',
    pesan: '📋 Tugas "Laporan Perkembangan Investasi Daerah Q2 2026" telah didelegasikan oleh Sub-Koordinator kepada Anda. Deadline: 20 Agustus 2026.',
    tipe: 'delegasi', task_id: 't9', dibaca: false, waktu: '2026-08-14T10:05:00',
  },
  {
    id: 'n4', untuk_user: 'staf_dwi',
    pesan: '📋 Tugas "Resume Rapat Koordinasi Bidang Ekonomi" telah didelegasikan oleh Sub-Koordinator kepada Anda.',
    tipe: 'delegasi', task_id: 't10', dibaca: true, waktu: '2026-08-15T15:02:00',
  },
  {
    id: 'n5', untuk_user: 'kabid1',
    pesan: '✅ Tugas "Koordinasi & Bahan Musrenbang Provinsi" telah disetujui dan selesai dikerjakan oleh Pak Eja.',
    tipe: 'approval', task_id: 't5', dibaca: true, waktu: '2026-05-29T10:30:00',
  },
  {
    id: 'n6', untuk_user: 'staf_dwi',
    pesan: '🔄 Tugas "Penyusunan Rancangan Akhir RKPD Murni 2027" sedang berlangsung. Deadline 30 Juni 2026 — harap segera selesaikan.',
    tipe: 'keterlambatan', task_id: 't6', dibaca: false, waktu: '2026-08-16T09:00:00',
  },
  {
    id: 'n7', untuk_user: 'subkoor1',
    pesan: '⏰ Tugas "Persiapan Penetapan RKPD Murni (Perkada)" deadline 15 Juli 2026 belum dimulai.',
    tipe: 'deadline', task_id: 't7', dibaca: false, waktu: '2026-08-16T09:05:00',
  },
];

/* ============================================================
   DATABASE FUNCTIONS
   ============================================================ */

function dbGet() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function dbSave(data) {
  try { localStorage.setItem(DB_KEY, JSON.stringify(data)); } catch (e) { console.error('dbSave error', e); }
}

function dbInit() {
  const existing = dbGet();
  if (!existing) {
    const initial = { tasks: SEED_TASKS, notifications: SEED_NOTIFICATIONS };
    dbSave(initial);
    return initial;
  }
  return existing;
}

function dbReset() {
  localStorage.removeItem(DB_KEY);
  dbInit();
}

/* ---- Tasks ---- */
function getTasks(filter = {}) {
  const db = dbGet();
  let tasks = (db && db.tasks) ? db.tasks : [];

  if (filter.jenis)          tasks = tasks.filter(t => t.jenis === filter.jenis);
  if (filter.status)         tasks = tasks.filter(t => t.status === filter.status);
  if (filter.ditugaskan_ke)  tasks = tasks.filter(t => t.ditugaskan_ke === filter.ditugaskan_ke);
  if (filter.dibuat_oleh)    tasks = tasks.filter(t => t.dibuat_oleh === filter.dibuat_oleh);
  if (filter.approval_status)tasks = tasks.filter(t => t.approval_status === filter.approval_status);
  if (filter.user_terlibat) {
    tasks = tasks.filter(t =>
      t.dibuat_oleh === filter.user_terlibat ||
      t.ditugaskan_ke === filter.user_terlibat ||
      (t.delegasi_chain || []).some(d => d.ke === filter.user_terlibat || d.dari === filter.user_terlibat)
    );
  }
  return tasks;
}

function getTask(id) {
  const db = dbGet();
  return ((db && db.tasks) || []).find(t => t.id === id) || null;
}

function saveTask(task) {
  const db = dbGet();
  const idx = db.tasks.findIndex(t => t.id === task.id);
  if (idx >= 0) db.tasks[idx] = task;
  else db.tasks.push(task);
  dbSave(db);
}

function createTask(data) {
  const id = 't' + Date.now();
  const task = {
    id,
    judul: data.judul,
    deskripsi: data.deskripsi || '',
    jenis: data.jenis,
    kategori_rutin: data.kategori_rutin || null,
    milestone_id: data.milestone_id || null,
    deadline: data.deadline,
    dibuat_oleh: data.dibuat_oleh,
    ditugaskan_ke: data.ditugaskan_ke,
    delegasi_chain: [{ dari: data.dibuat_oleh, ke: data.ditugaskan_ke, waktu: new Date().toISOString() }],
    status: 'belum',
    file_upload: null,
    approval_status: null,
    komentar_review: '',
    penilaian: null,
    dibuat_pada: new Date().toISOString(),
    diselesaikan_pada: null,
  };
  saveTask(task);
  return task;
}

/* ---- Notifications ---- */
function getNotifications(userId) {
  const db = dbGet();
  return ((db && db.notifications) || [])
    .filter(n => n.untuk_user === userId)
    .sort((a, b) => new Date(b.waktu) - new Date(a.waktu));
}

function addNotification(data) {
  const db = dbGet();
  if (!db.notifications) db.notifications = [];
  const notif = {
    id: 'n' + Date.now() + Math.random().toString(36).substr(2, 4),
    untuk_user: data.untuk_user,
    pesan: data.pesan,
    tipe: data.tipe || 'info',
    task_id: data.task_id || null,
    dibaca: false,
    waktu: new Date().toISOString(),
  };
  db.notifications.unshift(notif);
  dbSave(db);
  return notif;
}

function markNotifRead(id) {
  const db = dbGet();
  const n = (db.notifications || []).find(n => n.id === id);
  if (n) { n.dibaca = true; dbSave(db); }
}

function markAllNotifsRead(userId) {
  const db = dbGet();
  (db.notifications || []).filter(n => n.untuk_user === userId).forEach(n => n.dibaca = true);
  dbSave(db);
}

function getUnreadCount(userId) {
  return getNotifications(userId).filter(n => !n.dibaca).length;
}

/* ---- Users ---- */
function getUserById(id) { return USERS.find(u => u.id === id) || null; }
function getUsersByRole(role) { return USERS.filter(u => u.role === role); }

/* ---- Helpers ---- */
function formatDate(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return dateStr; }
}

function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

function formatDateTime(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return dateStr; }
}

function getDaysUntilDeadline(deadlineStr) {
  if (!deadlineStr) return Infinity;
  const now = new Date(); now.setHours(0,0,0,0);
  const dl  = new Date(deadlineStr); dl.setHours(0,0,0,0);
  return Math.round((dl - now) / 86400000);
}

function getStatusLabel(status) {
  return { belum: 'Belum Dikerjakan', sedang: 'Sedang Dikerjakan', selesai: 'Selesai', revisi: 'Perlu Revisi' }[status] || status;
}

function getStatusBadgeClass(status) {
  return { belum: 'badge-secondary', sedang: 'badge-warning', selesai: 'badge-success', revisi: 'badge-danger' }[status] || 'badge-secondary';
}

function getRoleLabel(role) {
  return { kabid: 'Kepala Bidang', subkoor: 'Sub-Koordinator', staf: 'Staf Pelaksana' }[role] || role;
}

function getKualitasLabel(k) {
  return { baik: 'Baik', cukup: 'Cukup', kurang: 'Kurang' }[k] || k;
}
