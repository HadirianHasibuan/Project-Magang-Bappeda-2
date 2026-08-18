import { useState } from 'react'
import { Save, ListChecks, CheckCircle2, Clock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { tasks } = useTasks()
  const [form, setForm] = useState({ name: user.name, email: user.email, role: user.role })
  const [saved, setSaved] = useState(false)

  const myTasks = tasks.filter((t) => t.assignee === user.name)

  const submit = (e) => {
    e.preventDefault()
    updateProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Akun</div>
          <h1>Profile</h1>
          <div className="page-sub">Kelola informasi akun Anda.</div>
        </div>
      </div>

      <div className="profile-head">
        <div className="avatar">{user.initials}</div>
        <div>
          <h2 style={{ fontSize: 19 }}>{user.name}</h2>
          <div className="page-sub" style={{ marginTop: 2 }}>{user.role} &middot; {user.email}</div>
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
        <div className="card stat-card">
          <div className="top">
            <div className="icon-wrap" style={{ background: 'var(--cobalt-100)', color: 'var(--cobalt)' }}>
              <ListChecks />
            </div>
          </div>
          <div className="value">{myTasks.length}</div>
          <div className="label">Task Ditugaskan</div>
        </div>
        <div className="card stat-card">
          <div className="top">
            <div className="icon-wrap" style={{ background: 'var(--leaf-100)', color: 'var(--leaf)' }}>
              <CheckCircle2 />
            </div>
          </div>
          <div className="value">{myTasks.filter((t) => t.status === 'done').length}</div>
          <div className="label">Task Selesai</div>
        </div>
        <div className="card stat-card">
          <div className="top">
            <div className="icon-wrap" style={{ background: 'var(--amber-100)', color: 'var(--amber)' }}>
              <Clock />
            </div>
          </div>
          <div className="value">{myTasks.filter((t) => t.status !== 'done').length}</div>
          <div className="label">Task Aktif</div>
        </div>
      </div>

      <div className="card card-pad" style={{ maxWidth: 480 }}>
        <div className="section-title">Informasi Akun</div>
        {saved && (
          <div style={{ background: 'var(--leaf-100)', color: 'var(--leaf)', padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
            Perubahan berhasil disimpan.
          </div>
        )}
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="name">Nama Lengkap</label>
            <input id="name" className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="field">
            <label htmlFor="role">Peran</label>
            <input id="role" className="input" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
          </div>
          <button type="submit" className="btn btn-primary">
            <Save size={15} /> Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  )
}
