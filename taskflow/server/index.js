import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import User from './models/User.js'
import Milestone from './models/Milestone.js'
import Task from './models/Task.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bappeda_taskflow'

app.use(cors())
app.use(express.json())

let isMongoConnected = false

// --- INITIAL BAPPEDA SEED DATA ---
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

const INITIAL_MILESTONES = [
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
    description: 'Menyiapkan template, panduan teknis, dan dokumen pendukung untuk Musrenbang Desa.',
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

let memoryUsers = [...INITIAL_USERS]
let memoryTasks = [...INITIAL_TASKS]

// --- CONNECT TO MONGODB & SEED ---
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
    isMongoConnected = true
    console.log(`🍃 Connected to MongoDB Database: ${MONGODB_URI}`)

    // Seed Users if empty
    const userCount = await User.countDocuments()
    if (userCount === 0) {
      await User.insertMany(INITIAL_USERS)
      console.log('🌱 Seeded MongoDB Users collection.')
    }

    // Seed Milestones if empty
    const milestoneCount = await Milestone.countDocuments()
    if (milestoneCount === 0) {
      await Milestone.insertMany(INITIAL_MILESTONES)
      console.log('🌱 Seeded MongoDB Milestones collection.')
    }

    // Seed Tasks if empty
    const taskCount = await Task.countDocuments()
    if (taskCount === 0) {
      await Task.insertMany(INITIAL_TASKS)
      console.log('🌱 Seeded MongoDB Tasks collection.')
    }
  } catch (err) {
    isMongoConnected = false
    console.warn(`⚠️ MongoDB connection warning (${err.message}). Operating with in-memory / JSON fallback mode.`)
  }
}

connectDB()

// --- API ROUTES ---

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isMongoConnected ? 'MongoDB' : 'In-Memory Fallback',
    mongodb_uri: MONGODB_URI,
    app: 'Sistem Manajemen Tugas Bappeda Bidang I Backend REST API (MongoDB)',
  })
})

// User Management & Login
app.get('/api/users', async (req, res) => {
  if (isMongoConnected) {
    const users = await User.find({}, { password: 0 })
    return res.json(users)
  }
  const safe = memoryUsers.map(({ password, ...u }) => u)
  res.json(safe)
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const cleanEmail = (email || '').trim().toLowerCase()

  let user = null
  if (isMongoConnected) {
    user = await User.findOne({ email: cleanEmail, password })
  } else {
    user = memoryUsers.find((u) => u.email.toLowerCase() === cleanEmail && u.password === password)
  }

  if (!user) {
    return res.status(401).json({ success: false, error: 'Email atau kata sandi tidak sesuai.' })
  }

  const uObj = user.toObject ? user.toObject() : { ...user }
  delete uObj.password
  res.json({ success: true, user: uObj })
})

// RKPD Milestones
app.get('/api/milestones', async (req, res) => {
  if (isMongoConnected) {
    const milestones = await Milestone.find()
    return res.json(milestones)
  }
  res.json(INITIAL_MILESTONES)
})

// Task REST API
app.get('/api/tasks', async (req, res) => {
  const { jenis, status, assignee_id } = req.query
  const filter = {}

  if (jenis && jenis !== 'all') filter.jenis = jenis
  if (status && status !== 'all') filter.status = status
  if (assignee_id && assignee_id !== 'all') filter.assignee_id = assignee_id

  if (isMongoConnected) {
    const tasks = await Task.find(filter).sort({ createdAt: -1 })
    return res.json(tasks)
  }

  let result = memoryTasks
  if (filter.jenis) result = result.filter((t) => t.jenis === filter.jenis)
  if (filter.status) result = result.filter((t) => t.status === filter.status)
  if (filter.assignee_id) result = result.filter((t) => t.assignee_id === filter.assignee_id)
  res.json(result)
})

app.get('/api/tasks/:id', async (req, res) => {
  if (isMongoConnected) {
    const task = await Task.findOne({ id: req.params.id })
    if (!task) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })
    return res.json(task)
  }
  const task = memoryTasks.find((t) => t.id === req.params.id)
  if (!task) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })
  res.json(task)
})

app.post('/api/tasks', async (req, res) => {
  const data = req.body
  const assigneeObj = INITIAL_USERS.find((u) => u.id === data.assignee_id) || INITIAL_USERS[2]

  const newTaskData = {
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

  if (isMongoConnected) {
    const doc = await Task.create(newTaskData)
    return res.status(201).json(doc)
  }

  memoryTasks.unshift(newTaskData)
  res.status(201).json(newTaskData)
})

app.put('/api/tasks/:id', async (req, res) => {
  if (isMongoConnected) {
    const updated = await Task.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })
    return res.json(updated)
  }
  const idx = memoryTasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })
  memoryTasks[idx] = { ...memoryTasks[idx], ...req.body }
  res.json(memoryTasks[idx])
})

app.delete('/api/tasks/:id', async (req, res) => {
  if (isMongoConnected) {
    await Task.deleteOne({ id: req.params.id })
    return res.json({ success: true, message: 'Tugas berhasil dihapus dari MongoDB.' })
  }
  memoryTasks = memoryTasks.filter((t) => t.id !== req.params.id)
  res.json({ success: true, message: 'Tugas berhasil dihapus.' })
})

// Delegation Endpoint
app.post('/api/tasks/:id/delegate', async (req, res) => {
  const { target_user_id, dari_role } = req.body

  if (isMongoConnected) {
    const task = await Task.findOne({ id: req.params.id })
    if (!task) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })

    const targetUser = await User.findOne({ id: target_user_id })
    if (!targetUser) return res.status(400).json({ error: 'User tujuan delegasi tidak ditemukan.' })

    task.delegasi_chain.push({
      dari: dari_role || 'Pimpinan',
      ke: targetUser.name,
      waktu: new Date().toLocaleString('id-ID'),
    })
    task.assignee_id = targetUser.id
    task.assignee = targetUser.name

    await task.save()
    return res.json(task)
  }

  const idx = memoryTasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })

  const targetUser = INITIAL_USERS.find((u) => u.id === target_user_id)
  if (!targetUser) return res.status(400).json({ error: 'User tujuan delegasi tidak ditemukan.' })

  memoryTasks[idx].delegasi_chain.push({
    dari: dari_role || 'Pimpinan',
    ke: targetUser.name,
    waktu: new Date().toLocaleString('id-ID'),
  })
  memoryTasks[idx].assignee_id = targetUser.id
  memoryTasks[idx].assignee = targetUser.name

  res.json(memoryTasks[idx])
})

// Softcopy Upload Endpoint
app.post('/api/tasks/:id/upload', async (req, res) => {
  const { file_name, file_size } = req.body

  const fileMeta = {
    nama: file_name || 'softcopy_hasil_kerja.pdf',
    ukuran: file_size || '2.4 MB',
    waktu: new Date().toLocaleString('id-ID'),
  }

  if (isMongoConnected) {
    const updated = await Task.findOneAndUpdate(
      { id: req.params.id },
      { status: 'sedang', file_upload: fileMeta, approval_status: 'pending' },
      { new: true }
    )
    return res.json(updated)
  }

  const idx = memoryTasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })

  memoryTasks[idx].status = 'sedang'
  memoryTasks[idx].file_upload = fileMeta
  memoryTasks[idx].approval_status = 'pending'

  res.json(memoryTasks[idx])
})

// Approval & Review Endpoint
app.post('/api/tasks/:id/review', async (req, res) => {
  const { action, komentar, penilaian } = req.body

  const patch =
    action === 'approve'
      ? {
          status: 'selesai',
          approval_status: 'approved',
          komentar_review: komentar || 'Softcopy disetujui pimpinan.',
          penilaian: penilaian || { ketepatan: 'tepat', kualitas: 'baik' },
          diselesaikan_pada: new Date().toISOString(),
        }
      : {
          status: 'revisi',
          approval_status: 'rejected',
          komentar_review: komentar || 'Perlu perbaikan sesuai arahan.',
        }

  if (isMongoConnected) {
    const updated = await Task.findOneAndUpdate({ id: req.params.id }, patch, { new: true })
    return res.json(updated)
  }

  const idx = memoryTasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Tugas tidak ditemukan.' })

  memoryTasks[idx] = { ...memoryTasks[idx], ...patch }
  res.json(memoryTasks[idx])
})

// Rekap Kinerja Endpoint
app.get('/api/rekap', async (req, res) => {
  let completed = []
  if (isMongoConnected) {
    completed = await Task.find({ status: 'selesai' })
  } else {
    completed = memoryTasks.filter((t) => t.status === 'selesai')
  }

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
