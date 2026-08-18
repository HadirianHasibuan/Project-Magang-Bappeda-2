import { Calendar, User, Edit3, Trash2, Eye } from 'lucide-react'
import { StatusBadge, JenisBadge, RatingBadge } from './Badges'

export default function TaskRow({ task, onView, onEdit, onDelete }) {
  return (
    <div className="task-row">
      <div className="task-main" onClick={() => onView(task)} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
          <div className="title" style={{ margin: 0 }}>{task.title}</div>
          <JenisBadge jenis={task.jenis} kategoriRutin={task.kategori_rutin} />
        </div>
        <div className="meta" style={{ gap: 8, flexWrap: 'wrap' }}>
          <StatusBadge task={task} />
          {task.penilaian && <RatingBadge penilaian={task.penilaian} />}
          <span>
            <Calendar size={12} style={{ verticalAlign: '-2px', marginRight: 3 }} />
            {task.deadline}
          </span>
          <span className="assignee-chip">
            <User size={12} /> {task.assignee}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn btn-icon btn-ghost" onClick={() => onView(task)} aria-label="Lihat detail">
          <Eye size={16} />
        </button>
        <button className="btn btn-icon btn-ghost" onClick={() => onEdit(task)} aria-label="Edit">
          <Edit3 size={16} />
        </button>
        <button className="btn btn-icon btn-ghost" onClick={() => onDelete(task)} aria-label="Hapus">
          <Trash2 size={16} color="var(--coral)" />
        </button>
      </div>
    </div>
  )
}

