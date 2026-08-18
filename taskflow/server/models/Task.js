import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    jenis: { type: String, enum: ['rutin', 'direktif'], default: 'direktif' },
    kategori_rutin: { type: String, default: null },
    milestone_id: { type: String, default: null },
    deadline: { type: String, required: true },
    dibuat_oleh: { type: String, default: 'kabid1' },
    assignee_id: { type: String, required: true },
    assignee: { type: String, required: true },
    delegasi_chain: [
      {
        dari: String,
        ke: String,
        waktu: String,
      },
    ],
    status: { type: String, enum: ['belum', 'sedang', 'selesai', 'revisi'], default: 'belum' },
    file_upload: {
      nama: String,
      ukuran: String,
      waktu: String,
    },
    approval_status: { type: String, enum: ['pending', 'approved', 'rejected', null], default: null },
    komentar_review: { type: String, default: '' },
    penilaian: {
      ketepatan: { type: String, enum: ['tepat', 'terlambat'] },
      kualitas: { type: String, enum: ['baik', 'cukup', 'kurang'] },
    },
    dibuat_pada: { type: String, default: () => new Date().toISOString() },
    diselesaikan_pada: { type: String, default: null },
  },
  { timestamps: true }
)

export default mongoose.models.Task || mongoose.model('Task', taskSchema)
