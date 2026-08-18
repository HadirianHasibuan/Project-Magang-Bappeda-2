import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckSquare, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      setError('Kata sandi minimal 6 karakter.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Konfirmasi kata sandi tidak cocok.')
      return
    }
    const res = register(form)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/')
  }

  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <div className="brand">
          <div className="mark">
            <CheckSquare size={17} />
          </div>
          TaskFlow
        </div>
        <div className="pitch">
          <h2>Satu ruang kerja untuk perencanaan, pengerjaan, dan evaluasi task.</h2>
          <p>Buat akun gratis dan mulai atur task, deadline, dan progres tim Anda hari ini.</p>
        </div>
        <div className="stats">
          <div>
            <b>5 mnt</b>
            <span>Setup awal</span>
          </div>
          <div>
            <b>Gratis</b>
            <span>Untuk memulai</span>
          </div>
        </div>
      </div>
      <div className="auth-form-col">
        <div className="auth-form">
          <h1>Buat akun baru</h1>
          <p className="sub">Mulai kelola task Anda dalam hitungan menit.</p>
          {error && <div className="form-error">{error}</div>}
          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Nama Lengkap</label>
              <input id="name" className="input" placeholder="Nama Anda" value={form.name} onChange={set('name')} required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="input" placeholder="nama@email.com" value={form.email} onChange={set('email')} required />
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="password">Kata Sandi</label>
                <input id="password" type="password" className="input" placeholder="Min. 6 karakter" value={form.password} onChange={set('password')} required />
              </div>
              <div className="field">
                <label htmlFor="confirm">Konfirmasi</label>
                <input id="confirm" type="password" className="input" placeholder="Ulangi sandi" value={form.confirm} onChange={set('confirm')} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
              <UserPlus size={15} /> Daftar
            </button>
          </form>
          <div className="auth-switch">
            Sudah punya akun? <Link to="/login">Masuk di sini</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
