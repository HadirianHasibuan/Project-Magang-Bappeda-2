import mongoose from 'mongoose'

const milestoneSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    bulan: { type: Number, required: true },
    kategori: { type: String, enum: ['rkpd_murni', 'rkpd_perubahan'], required: true },
    deadline: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Milestone || mongoose.model('Milestone', milestoneSchema)
