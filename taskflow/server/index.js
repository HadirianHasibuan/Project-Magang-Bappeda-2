import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = path.join(__dirname, 'data.json')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// --- INITIAL BAPPEDA DATA ---
const INITIAL_USERS = [
  {
    id: 'kabid1',
    name: 'Kepala Bidang I',
    nip: '196501011990031001',
    jabatan: 'Kepala Bidang Perencanaan Ekonomi & Infrastruktur',
    role: 'kabid',
    email: 'kabid1@bappeda.go.id',
    password: 'password123',
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
    password: 'password123',
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
    password: 'password123',
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
    password: 'password123',
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
    password: 'password123',
    initials: 'DS',
    color: '#ec4899',
  },
]

const RKPD_MILESTONES = [
  { id: 'm1', nama: 'Musrenbang Desa / Kelurahan', bulan: 1, kategori: 'rkpd_murni', deadline: '2026-01-31' },
  { id: 'm2', nama: 'Musrenbang Kecamatan', bulan: 2, kategori: 'rkpd_murni', deadline: '2026-02-28' },
  { id: 'm3', nama: 'Forum SKPD', bulan: 3, kategori: 'rkpd_murni', deadline: '2026-03-31' },
  { id: 'm4', nama: 'Musrenbang Kabupaten / Kota', bulan: 4, kategori: 'rkpd_murni', deadline: '2026-04-30' },
  { id: 'm5', nama: 'Musrenbang Provinsi', bulan: 5, kategori: 'rkpd_murni', deadline: '2026-05-31' },
  { id: 'm6', nama: 'Penyusunan Rancangan Akhir RKPD', bulan: 6, kategori: 'rkpd_murni', deadline: '2026-06-30' },
  { id: 'm7', nama: 'Penetapan RKPD Murni (Perkada)', bulan: 7, kategori: 'rkpd_murni', deadline: '2026-07-15' },
  { id: 'm8', nama: 'Evaluasi & Persiapan RKPD Perubahan', bulan: 7, kategori: 'rkpd_perubahan', deadline: '2026-07-31' },
  { id: 'm9', nama: 'Penyusunan Rancangan RKPD Perubahan', bulan: 8, kategori: 'rkpd_perubahan', deadline: '2026-08-15' },
  { id: 'm10', nama: 'Penetapan RKPD Perubahan (Perkada)', bulan: 8, kategori: 'rkpd_perubahan', deadline: '2026-08-31' },
]

const INITIAL_TASKS = [
  {
    id: 't1',
    title: 'Persiapan Dokumen Musrenbang Desa/Kelurahan',
    description: 'Menyiapkan template, panduan teknis, dan dokumen pendukung untuk pelaksanaan Musrenbang Desa.',
    jenis: 'rutin',
    kategori_rutin: 'rkpd_murni',
    milestone_id: 'm1',
    deadline: '2026-01-31',
    dibuat_oleh: 'kabid1',
    assignee_id: 'staf_eja',
    assignee: 'Pak Eja',
    delegasi_chain: [
      { dari: 'Kepala Bidang I', ke: 'Sub-Koordinator Perencanaan', waktu: '2026-01-05 08:00' },
      { dari: 'Sub-Koordinator Perencanaan', ke: 'Pak Eja', waktu: '2026-01-06 09:00' },
    ],
    status: 'selesai',
    file_upload: { nama: 'dokumen_musrenbang_desa.pdf', ukuran: '2.3 MB', waktu: '2026-01-28 10:30' },
    approval_status: 'approved',
    komentar_review: 'Dokumen sudah lengkap dan sesuai format standar.',
    penilaian: { ketepatan: 'tepat', kualitas: 'baik' },
    dibuat_pada: '2026-01-05 07:00',
    diselesaikan_pada: '2026-01-28 10:30',
  },
  {
    id: 't2',
    title: 'Rekap Hasil Musrenbang Kecamatan',
    description: 'Menyusun rekapitulasi dan kompilasi hasil Musrenbang Kecamatan.',
    jenis: 'rutin',
    kategori_rutin: 'rkpd_murni',
    milestone_id: 'm2',
    deadline: '2026-02-28',
    dibuat_oleh: 'kabid1',
    assignee_id: 'staf_eja',
    assignee: 'Pak Eja',
    delegasi_chain: [
      { dari: 'Kepala Bidang I', ke: 'Sub-Koordinator Perencanaan', waktu: '2026-02-01 08:00' },
      { dari: 'Sub-Koordinator Perencanaan', ke: 'Pak Eja', waktu: '2026-02-02 09:00' },
    ],
    status: 'selesai',
    file_upload: { nama: 'rekap_musrenbang_kecamatan.xlsx', ukuran: '1.8 MB', waktu: '2026-02-25 14:00' },
    approval_status: 'approved',
    komentar_review: 'Rekapitulasi lengkap dan terstruktur.',
    penilaian: { ketepatan: 'tepat', kualitas: 'baik' },
    dibuat_pada: '2026-02-01 07:00',
    diselesaikan_pada: '2026-02-25 14:00',
  },
  {
    id: 't9',
    title: 'Laporan Perkembangan Investasi Daerah Q2 2026',
    description: 'Gubernur meminta laporan komprehensif perkembangan realisasi investasi daerah Kuartal 2.',
    jenis: 'direktif',
    kategori_rutin: null,
    milestone_id: null,
    deadline: '2026-08-20',
    dibuat_oleh: 'kabid1',
    assignee_id: 'staf_eja',
    assignee: 'Pak Eja',
    delegasi_chain: [
      { dari: 'Kepala Bappeda / Gubernur', ke: 'Kepala Bidang I', waktu: '2026-08-14 08:00' },
      { dari: 'Kepala Bidang I', ke: 'Sub-Koordinator Perencanaan', waktu: '2026-08-14 09:00' },
      { dari: 'Sub-Koordinator Perencanaan', ke: 'Pak Eja', waktu: '2026-08-14 10:00' },
    ],
    status: 'sedang',
    file_upload: null,
    approval_status: 'pending',
    komentar_review: '',
    penilaian: null,
    dibuat_pada: '2026-08-14 08:00',
    diselesaikan_pada: null,
  },
]

// --- JSON PERSISTENCE HELPERS ---
function loadData() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8')
      return JSON.parse(raw)
    }
  } catch (err) {
    console.error('Error reading DB_FILE:', err)
  }
  const initial = { users: INITIAL_USERS, tasks: INITIAL_TASKS }
  saveData(initial)
  return initial
}

function saveData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing DB_FILE:', err)
  }
}

// --- API ROUTES ---

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Sistem Manajemen Tugas Bappeda Bidang I Backend REST API v1.0' })
})

// User Management & Login
app.get('/api/users', (req, res) => {
  const db = loadData()
  const safeUsers = db.users.map(({ password, ...u }) => u)
  res.json(safeUsers)
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  const db = loadData()
  const user = db.users.find(
    (u) => u.email.toLowerCase() === (email || '').trim().toLowerCase() && u.password === password
  )
  if (!user) {
    return res.status(401).json({ success: false, error: 'Email atau kata sandi tidak sesuai.' })
  }
  const { password: _pw, ...safeUser } = user
  res.json({ success: true, user: safeUser })
})

// RKPD Milestones
app.get('/api/milestones', (req, res) => {
  res.json(RKPD_MILESTONES)
})

// Task REST API
app.get('/api/tasks', (req, res) => {
  const db = loadData()
  let { jenis, status, assignee_id } = req.query
  let result = db.tasks

  if (jenis && jenis !== 'all') result = result.filter((t) => t.jenis === jenis)
  if (status && status !== 'all') result = result.filter((t) => t.status === status)
  if (assignee_id && assignee_id !== 'all') result = result.filter((t) => t.assignee_id === assignee_id)

  res.json(result)
})

app.get('/api/tasks/:id', (req, res) => {
  const db = loadData()
  const task = db.tasks.find((t) => t.id === req.params.id)
  if (!task) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })
  res.json(task)
})

app.post('/api/tasks', (req, res) => {
  const db = loadData()
  const data = req.body
  const assigneeObj = db.users.find((u) => u.id === data.assignee_id) || db.users[2]

  const newTask = {
    id: `t_${Date.now()}`,
    title: data.title,
    description: data.description || '',
    jenis: data.jenis || 'direktif',
    kategori_rutin: data.kategori_rutin || null,
    milestone_id: data.milestone_id || null,
    deadline: data.deadline || new Date().toISOString().slice(0, 10),
    dibuat_oleh: data.dibuat_oleh || 'kabid1',
    assignee_id: assigneeObj.id,
    assignee: assigneeObj.name,
    delegasi_chain: [
      { dari: 'Kepala Bidang I', ke: assigneeObj.name, waktu: new Date().toLocaleString('id-ID') },
    ],
    status: 'belum',
    file_upload: null,
    approval_status: null,
    komentar_review: '',
    penilaian: null,
    dibuat_pada: new Date().toISOString(),
    diselesaikan_pada: null,
  }

  db.tasks.unshift(newTask)
  saveData(db)
  res.status(201).json(newTask)
})

app.put('/api/tasks/:id', (req, res) => {
  const db = loadData()
  const idx = db.tasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })

  db.tasks[idx] = { ...db.tasks[idx], ...req.body }
  saveData(db)
  res.json(db.tasks[idx])
})

app.delete('/api/tasks/:id', (req, res) => {
  const db = loadData()
  db.tasks = db.tasks.filter((t) => t.id !== req.params.id)
  saveData(db)
  res.json({ success: true, message: 'Tugas berhasil dihapus.' })
})

// Delegation Endpoint
app.post('/api/tasks/:id/delegate', (req, res) => {
  const { target_user_id, dari_role } = req.body
  const db = loadData()
  const idx = db.tasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })

  const targetUser = db.users.find((u) => u.id === target_user_id)
  if (!targetUser) return res.status(400).json({ error: 'User tujuan delegasi tidak ditemukan.' })

  const chain = db.tasks[idx].delegasi_chain || []
  chain.push({
    dari: dari_role || 'Pimpinan',
    ke: targetUser.name,
    waktu: new Date().toLocaleString('id-ID'),
  })

  db.tasks[idx].assignee_id = targetUser.id
  db.tasks[idx].assignee = targetUser.name
  db.tasks[idx].delegasi_chain = chain

  saveData(db)
  res.json(db.tasks[idx])
})

// Softcopy File Upload Endpoint
app.post('/api/tasks/:id/upload', (req, res) => {
  const { file_name, file_size } = req.body
  const db = loadData()
  const idx = db.tasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })

  db.tasks[idx].status = 'sedang'
  db.tasks[idx].file_upload = {
    nama: file_name || 'softcopy_hasil_kerja.pdf',
    ukuran: file_size || '2.4 MB',
    waktu: new Date().toLocaleString('id-ID'),
  }
  db.tasks[idx].approval_status = 'pending'

  saveData(db)
  res.json(db.tasks[idx])
})

// Approval & Review Endpoint
app.post('/api/tasks/:id/review', (req, res) => {
  const { action, komentar, penilaian } = req.body // action: 'approve' | 'reject'
  const db = loadData()
  const idx = db.tasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })

  if (action === 'approve') {
    db.tasks[idx].status = 'selesai'
    db.tasks[idx].approval_status = 'approved'
    db.tasks[idx].komentar_review = komentar || 'Softcopy disetujui pimpinan.'
    db.tasks[idx].penilaian = penilaian || { ketepatan: 'tepat', kualitas: 'baik' }
    db.tasks[idx].diselesaikan_pada = new Date().toISOString()
  } else {
    db.tasks[idx].status = 'revisi'
    db.tasks[idx].approval_status = 'rejected'
    db.tasks[idx].komentar_review = komentar || 'Perlu perbaikan sesuai arahan.'
  }

  saveData(db)
  res.json(db.tasks[idx])
})

// Rekap Kinerja Endpoint
app.get('/api/rekap', (req, res) => {
  const db = loadData()
  const completed = db.tasks.filter((t) => t.status === 'selesai')
  const totalCompleted = completed.length

  let tepat = 0
  let baik = 0, cukup = 0, kurang = 0

  completed.forEach((t) => {
    if (t.penilaian?.ketepatan === 'tepat') tepat++
    if (t.penilaian?.kualitas === 'baik') baik++
    else if (t.penilaian?.kualitas === 'cukup') cukup++
    else if (t.penilaian?.kualitas === 'kurang') kurang++
  })

  res.json({
    totalCompleted,
    tepatWaktu: tepat,
    terlambat: totalCompleted - tepat,
    persentaseTepat: totalCompleted > 0 ? Math.round((tepat / totalCompleted) * 100) : 0,
    kualitas: { baik, cukup, kurang },
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Bappeda TaskFlow REST API Backend server running at http://localhost:${PORT}`)
})
