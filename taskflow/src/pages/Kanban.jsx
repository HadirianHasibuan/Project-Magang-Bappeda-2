import { useMemo, useState } from 'react'
import { Plus, Calendar, User } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { StatusBadge, JenisBadge } from '../components/Badges'

const COLUMNS = [
  { key: 'belum', label: 'Belum Dikerjakan' },
  { key: 'sedang', label: 'Sedang Dikerjakan' },
  { key: 'revisi', label: 'Perlu Revisi' },
  { key: 'selesai', label: 'Selesai' },
]

export default function Kanban({ onView, onAdd, globalQuery }) {
  const { tasks, moveTask } = useTasks()
  const [dragId, setDragId] = useState(null)
  const [overCol, setOverCol] = useState(null)

  const filtered = useMemo(() => {
    const q = globalQuery.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter((t) => t.title.toLowerCase().includes(q) || t.assignee.toLowerCase().includes(q))
  }, [tasks, globalQuery])

  const grouped = (status) => filtered.filter((t) => t.status === status)

  const handleDrop = (status) => (e) => {
    e.preventDefault()
    if (dragId) moveTask(dragId, status)
    setDragId(null)
    setOverCol(null)
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Papan Alur Kerja Bidang I</div>
          <h1>Papan Kanban Bappeda</h1>
          <div className="page-sub">Seret kartu untuk mengubah alur status pekerjaan.</div>
        </div>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={16} /> Buat Penugasan
        </button>
      </div>

      <div className="kanban-board" style={{ gridTemplateColumns: 'repeat(4, minmax(240px, 1fr))', overflowX: 'auto' }}>
        {COLUMNS.map((col) => (
          <div
            key={col.key}
            className={`kanban-col ${overCol === col.key ? 'drag-over' : ''}`}
            data-status={col.key}
            onDragOver={(e) => {
              e.preventDefault()
              setOverCol(col.key)
            }}
            onDragLeave={() => setOverCol((c) => (c === col.key ? null : c))}
            onDrop={handleDrop(col.key)}
          >
            <div className="kanban-col-head">
              <h4>{col.label}</h4>
              <span className="kanban-count">{grouped(col.key).length}</span>
            </div>
            <div className="kanban-cards">
              {grouped(col.key).map((t) => (
                <div
                  key={t.id}
                  className={`kanban-card ${dragId === t.id ? 'dragging' : ''}`}
                  draggable
                  onDragStart={() => setDragId(t.id)}
                  onDragEnd={() => {
                    setDragId(null)
                    setOverCol(null)
                  }}
                  onClick={() => onView(t)}
                  style={{ gap: 8 }}
                >
                  <div className="title" style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    <StatusBadge task={t} />
                    <JenisBadge jenis={t.jenis} kategoriRutin={t.kategori_rutin} />
                  </div>
                  <div className="row-bottom" style={{ marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={12} /> {t.deadline}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <User size={12} /> {t.assignee}
                    </span>
                  </div>
                </div>
              ))}
              {grouped(col.key).length === 0 && <div className="kanban-drop-hint">Letakkan kartu di sini</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

