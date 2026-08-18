import { useState } from 'react'
import { X, FileText, Zap } from 'lucide-react'
import { USERS, RKPD_MILESTONES } from '../data/seed'

export default function TaskFormModal({ initial, onClose, onSubmit }) {
  const isEdit = Boolean(initial?.id)
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    jenis: initial?.jenis || 'direktif',
    kategori_rutin: initial?.kategori_rutin || 'rkpd_murni',
    milestone_id: initial?.milestone_id || 'm1',
    deadline: initial?.deadline || new Date().toISOString().slice(0, 10),
    assignee_id: initial?.assignee_id || USERS[2].id,
  })
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Judul tugas wajib diisi.')
      return
    }
    onSubmit(form)
  }

  const milestonesFiltered = RKPD_MILESTONES.filter(
    (m) => m.kategori === form.kategori_rutin
  )

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 540 }}>
        <div className="modal-head">
          <h3>{isEdit ? 'Edit Tugas Bappeda' : 'Buat Penugasan Baru'}</h3>
          <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="modal-body">
            {error && <div className="form-error">{error}</div>}

            {/* Jenis Tugas Radio */}
            <div className="field">
              <label>Jenis Tugas</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 4 }}>
                <label
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: `2px solid ${form.jenis === 'rutin' ? 'var(--cobalt)' : 'var(--border)'}`,
                    background: form.jenis === 'rutin' ? 'var(--cobalt-100)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <input
                    type="radio"
                    name="jenis"
                    value="rutin"
                    checked={form.jenis === 'rutin'}
                    onChange={set('jenis')}
                    style={{ display: 'none' }}
                  />
                  <FileText size={16} color={form.jenis === 'rutin' ? 'var(--cobalt)' : 'var(--text-muted)'} />
                  Rutin (Tahunan RKPD)
                </label>
                <label
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: `2px solid ${form.jenis === 'direktif' ? '#ec4899' : 'var(--border)'}`,
                    background: form.jenis === 'direktif' ? 'rgba(236, 72, 153, 0.1)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <input
                    type="radio"
                    name="jenis"
                    value="direktif"
                    checked={form.jenis === 'direktif'}
                    onChange={set('jenis')}
                    style={{ display: 'none' }}
                  />
                  <Zap size={16} color={form.jenis === 'direktif' ? '#ec4899' : 'var(--text-muted)'} />
                  Direktif (Arahan Pimpinan)
                </label>
              </div>
            </div>

            {/* If Rutin: Milestone selection */}
            {form.jenis === 'rutin' && (
              <div className="field-row" style={{ marginTop: 12 }}>
                <div className="field">
                  <label htmlFor="kategori_rutin">Kategori RKPD</label>
                  <select id="kategori_rutin" className="select" value={form.kategori_rutin} onChange={set('kategori_rutin')}>
                    <option value="rkpd_murni">RKPD Murni</option>
                    <option value="rkpd_perubahan">RKPD Perubahan</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="milestone_id">Tahapan / Milestone</label>
                  <select id="milestone_id" className="select" value={form.milestone_id} onChange={set('milestone_id')}>
                    {milestonesFiltered.map((m) => (
                      <option key={m.id} value={m.id}>
                        Bln {m.bulan}: {m.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="field" style={{ marginTop: 12 }}>
              <label htmlFor="title">Judul Tugas / Pekerjaan</label>
              <input
                id="title"
                className="input"
                placeholder="cth. Penyusunan Bahan Musrenbang Desa / Laporan Investasi"
                value={form.title}
                onChange={set('title')}
                autoFocus
              />
            </div>

            <div className="field">
              <label htmlFor="desc">Deskripsi & Arahan Rinci</label>
              <textarea
                id="desc"
                className="textarea"
                rows={3}
                placeholder="Tuliskan petunjuk teknis atau arahan khusus untuk pelaksana..."
                value={form.description}
                onChange={set('description')}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="deadline">Batas Waktu (Deadline)</label>
                <input
                  id="deadline"
                  type="date"
                  className="input"
                  value={form.deadline}
                  onChange={set('deadline')}
                />
              </div>
              <div className="field">
                <label htmlFor="assignee_id">Pelaksana / Ditugaskan Ke</label>
                <select id="assignee_id" className="select" value={form.assignee_id} onChange={set('assignee_id')}>
                  {USERS.filter((u) => u.role !== 'kabid').map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.jabatan})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Simpan Perubahan' : 'Kirim Penugasan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

