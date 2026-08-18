import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ListTodo, Loader, CheckCircle2, AlertTriangle, LayoutList, ArrowRight, Target, Clock, RefreshCw, FileText } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { useAuth } from '../context/AuthContext'
import StatCard from '../components/StatCard'
import ProgressChart from '../components/ProgressChart'
import TaskRow from '../components/TaskRow'

export default function Dashboard({ onView, onAdd }) {
  const { tasks, stats } = useTasks()
  const { user } = useAuth()

  const upcoming = useMemo(() => {
    return [...tasks]
      .filter((t) => t.status !== 'selesai')
      .sort((a, b) => (a.deadline < b.deadline ? -1 : 1))
      .slice(0, 5)
  }, [tasks])

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 11) return 'Selamat pagi'
    if (h < 15) return 'Selamat siang'
    if (h < 18) return 'Selamat sore'
    return 'Selamat malam'
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Sistem Manajemen Tugas Bappeda Bidang I</div>
          <h1>
            {greeting()}, {user?.name} 👋
          </h1>
          <div className="page-sub">
            {user?.jabatan} • Monitoring alur komando, dokumen RKPD, dan direktif pimpinan.
          </div>
        </div>
        <button onClick={onAdd} className="btn btn-primary">
          + Buat Penugasan Baru
        </button>
      </div>

      {/* Stat Cards - Bappeda Statuses */}
      <div className="stat-grid">
        <StatCard label="Total Pekerjaan" value={stats.total} Icon={LayoutList} tone="cobalt" />
        <StatCard label="Belum Dikerjakan" value={stats.belum} Icon={ListTodo} tone="slate" />
        <StatCard label="Sedang Dikerjakan" value={stats.sedang} Icon={Loader} tone="amber" />
        <StatCard label="Selesai" value={stats.selesai} Icon={CheckCircle2} tone="leaf" />
        <StatCard label="Perlu Revisi / Terlambat" value={stats.revisi + stats.overdue} Icon={AlertTriangle} tone="coral" />
      </div>

      {/* Target 40 Hari Banner */}
      <div className="card card-pad" style={{ marginTop: 20, marginBottom: 24, background: 'linear-gradient(135deg, rgba(36,84,230,0.08) 0%, rgba(99,102,241,0.04) 100%)', border: '1px solid rgba(36,84,230,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target color="var(--cobalt)" size={20} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--cobalt)' }}>Rencana Kerja System Rollout (Target 40 Hari)</h3>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, background: 'var(--cobalt)', color: '#fff', padding: '2px 10px', borderRadius: 12 }}>
            Status: Tahap 3 (Implementasi Code)
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div style={{ background: 'var(--bg-elevated)', padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--leaf)' }}>✓ TAHAP 1 (Hari 1-10)</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>Identifikasi & Inventarisasi</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Wawancara & diskusi alur kerja Bidang 1.</div>
          </div>
          <div style={{ background: 'var(--bg-elevated)', padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--leaf)' }}>✓ TAHAP 2 (Hari 11-25)</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>Konsep & Mockup Flowchart</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Penyusunan flowchart dan paparan ke pimpinan.</div>
          </div>
          <div style={{ background: 'var(--bg-elevated)', padding: 12, borderRadius: 8, border: '2px solid var(--cobalt)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--cobalt)' }}>⚡ TAHAP 3 (Hari 26-40)</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>Pengodingan & Implementasi</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Coding penuh sistem manajemen tugas Bappeda.</div>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        {/* Nearest Deadline Task List */}
        <div className="card card-pad">
          <div className="section-title">
            Pekerjaan Prioritas & Batas Waktu Terdekat
            <Link to="/calendar" style={{ fontSize: 13, fontWeight: 600, color: 'var(--cobalt)' }}>
              Kalender RKPD
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="empty-state">
              <p>Tidak ada tugas aktif saat ini.</p>
            </div>
          ) : (
            <div className="task-list">
              {upcoming.map((t) => (
                <TaskRow key={t.id} task={t} onView={onView} onEdit={onView} onDelete={onView} />
              ))}
            </div>
          )}
        </div>

        {/* Progress Summary Chart */}
        <div className="card card-pad">
          <div className="section-title">Progress Penyelesaian Pekerjaan</div>
          <ProgressChart stats={{ total: stats.total, todo: stats.belum, inprogress: stats.sedang, done: stats.selesai }} />
          {stats.revisi > 0 && (
            <div
              style={{
                marginTop: 16,
                padding: '10px 12px',
                background: 'var(--coral-100)',
                color: 'var(--coral)',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <RefreshCw size={15} /> {stats.revisi} tugas memerlukan revisi softcopy
            </div>
          )}
          {stats.overdue > 0 && (
            <div
              style={{
                marginTop: 8,
                padding: '10px 12px',
                background: 'var(--coral-100)',
                color: 'var(--coral)',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <AlertTriangle size={15} /> {stats.overdue} tugas melewati batas waktu (deadline)
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

