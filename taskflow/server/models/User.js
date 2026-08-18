import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    nip: { type: String, default: '' },
    jabatan: { type: String, default: '' },
    role: { type: String, enum: ['kabid', 'subkoor', 'staf'], default: 'staf' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    initials: { type: String, default: 'U' },
    color: { type: String, default: '#6366f1' },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', userSchema)
