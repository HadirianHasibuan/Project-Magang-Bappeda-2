import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckSquare, Lock, UserCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { USERS } from '../data/seed'

export default function Login() {
  const { login, switchUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const res = login(form)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/')
  }

  const handleQuickLogin = (userObj) => {
    switchUser(userObj.id)
    navigate('/')
  }

  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <div className="brand">
          <div className="mark">
            <CheckSquare size={17} />
          </div>
          Bappeda TaskFlow
        </div>
        <div className="pitch">
          <h2>Sistem Manajemen Tugas & Alur Kerja Bappeda Bidang I</h2>
          <p>
            Platform terpadu penyusunan dokumen RKPD Murni/Perubahan dan disposisi direktif Pimpinan secara berjenjang & real-time.
          </p>
        </div>
        <div className="stats">
          <div>
            <b>10</b>
            <span>Milestone RKPD</span>
          </div>
          <div>
            <b>3 Peran</b>
            <span>Kabid • Subkoor • Staf</span>
          </div>
          <div>
            <b>40 Hari</b>
            <span>Target System Rollout</span>
          </div>
        </div>
      </div>

      <div className="auth-form-col">
        <div className="auth-form" style={{ maxWidth: 440 }}>
          <h1>Masuk Sistem Bappeda</h1>
          <p className="sub">Pilih akun simulasi peran atau masuk dengan email Anda.</p>

          {/* Quick Login Buttons for Bappeda roles */}
          <div style={{ background: 'var(--bg-sunken)', padding: 14, borderRadius: 12, marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <UserCheck size={14} color="var(--cobalt)" /> Masuk Cepat Peran Bappeda:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {USERS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickLogin(u)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: 'var(--bg-elevated)',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: u.color }} />
                    <span style={{ fontWeight: 600, fontSize: 12 }}>{u.name}</span>
                  </div>
                  <span style={{ fontSize: 10, background: 'var(--bg-sunken)', padding: '2px 8px', borderRadius: 10, color: 'var(--text-muted)' }}>
                    {u.role.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="kabid1@bappeda.go.id"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Kata Sandi</label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
              <Lock size={15} /> Masuk Akun
            </button>
          </form>
          <div className="auth-switch">
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

