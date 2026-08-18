import { useMemo, useState } from 'react'
import { ClipboardList, Filter } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import SearchFilterBar from '../components/SearchFilterBar'
import TaskRow from '../components/TaskRow'

export default function MyTasks({ onView, onEdit, onDelete, onAdd, globalQuery, setGlobalQuery }) {
  const { tasks } = useTasks()
  const [jenis, setJenis] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    const q = globalQuery.trim().toLowerCase()
    return tasks.filter((t) => {
      const matchQ =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.assignee.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      const matchJenis = jenis === 'all' || t.jenis === jenis
      const matchStatus = status === 'all' || t.status === status
      return matchQ && matchJenis && matchStatus
    })
  }, [tasks, globalQuery, jenis, status])

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Pengelolaan Tugas Bidang I</div>
          <h1>Daftar Penugasan</h1>
          <div className="page-sub">
            {filtered.length} dari {tasks.length} pekerjaan ditampilkan
          </div>
        </div>
        <button onClick={onAdd} className="btn btn-primary">
          + Buat Penugasan Baru
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="card card-pad" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <input
              className="input"
              placeholder="Cari kata kunci, nama staf, atau tugas..."
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <select className="select" value={jenis} onChange={(e) => setJenis(e.target.value)}>
              <option value="all">Semua Jenis Tugas</option>
              <option value="rutin">Tugas Rutin (RKPD)</option>
              <option value="direktif">Tugas Direktif (Pimpinan)</option>
            </select>
            <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">Semua Status</option>
              <option value="belum">Belum Dikerjakan</option>
              <option value="sedang">Sedang Dikerjakan</option>
              <option value="revisi">Perlu Revisi</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card empty-state">
          <ClipboardList size={32} color="var(--text-faint)" />
          <h3>Tidak ada penugasan ditemukan</h3>
          <p>Coba ubah kata kunci pencarian atau filter yang Anda pilih.</p>
        </div>
      ) : (
        <div className="task-list">
          {filtered.map((t) => (
            <TaskRow key={t.id} task={t} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

