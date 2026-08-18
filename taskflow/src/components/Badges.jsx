import { ArrowUp, Minus, ArrowDown, FileText, Zap, Award, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { isOverdue } from '../context/TaskContext'

const STATUS_MAP = {
  belum: { label: 'Belum Dikerjakan', cls: 'badge-slate' },
  sedang: { label: 'Sedang Dikerjakan', cls: 'badge-amber' },
  selesai: { label: 'Selesai', cls: 'badge-leaf' },
  revisi: { label: 'Perlu Revisi', cls: 'badge-coral' },
}

export function StatusBadge({ task }) {
  if (isOverdue(task) && task.status !== 'selesai') {
    return (
      <span className="badge status-overdue" style={{ background: 'var(--coral-100)', color: 'var(--coral)', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--coral)' }} /> Terlambat
      </span>
    )
  }
  const s = STATUS_MAP[task.status] || STATUS_MAP.belum
  const colorMap = {
    belum: { bg: 'var(--slate-100)', color: 'var(--slate)' },
    sedang: { bg: 'var(--amber-100)', color: 'var(--amber)' },
    selesai: { bg: 'var(--leaf-100)', color: 'var(--leaf)' },
    revisi: { bg: 'var(--coral-100)', color: 'var(--coral)' },
  }
  const style = colorMap[task.status] || colorMap.belum

  return (
    <span className={`badge ${s.cls}`} style={{ background: style.bg, color: style.color, padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: style.color }} /> {s.label}
    </span>
  )
}

export function JenisBadge({ jenis, kategoriRutin }) {
  if (jenis === 'rutin') {
    return (
      <span style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <FileText size={12} /> Rutin {kategoriRutin === 'rkpd_murni' ? '(RKPD Murni)' : '(RKPD Perubahan)'}
      </span>
    )
  }
  return (
    <span style={{ background: 'rgba(236, 72, 153, 0.12)', color: '#ec4899', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Zap size={12} /> Direktif Pimpinan
    </span>
  )
}

export function RatingBadge({ penilaian }) {
  if (!penilaian) return null
  const isTepat = penilaian.ketepatan === 'tepat'
  const kualitasColor = {
    baik: '#10b981',
    cukup: '#f59e0b',
    kurang: '#ef4444',
  }[penilaian.kualitas] || '#10b981'

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <span style={{ background: isTepat ? 'var(--leaf-100)' : 'var(--coral-100)', color: isTepat ? 'var(--leaf)' : 'var(--coral)', fontSize: 11, padding: '2px 8px', borderRadius: 12, fontWeight: 600 }}>
        {isTepat ? 'Tepat Waktu' : 'Terlambat'}
      </span>
      <span style={{ background: 'var(--bg-sunken)', color: kualitasColor, fontSize: 11, padding: '2px 8px', borderRadius: 12, fontWeight: 700, border: `1px solid ${kualitasColor}` }}>
        <Award size={11} style={{ verticalAlign: '-1px', marginRight: 2 }} /> {penilaian.kualitas.toUpperCase()}
      </span>
    </div>
  )
}

export function PriorityPill({ priority }) {
  const map = {
    high: { label: 'Tinggi', cls: 'prio-high', Icon: ArrowUp },
    medium: { label: 'Sedang', cls: 'prio-medium', Icon: Minus },
    low: { label: 'Rendah', cls: 'prio-low', Icon: ArrowDown },
  }
  const { label, cls, Icon } = map[priority] || map.medium
  return (
    <span className={`prio-pill ${cls}`}>
      <Icon /> {label}
    </span>
  )
}

