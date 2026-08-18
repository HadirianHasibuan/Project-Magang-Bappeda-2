import { useMemo, useState } from 'react'
import { Award, CheckCircle2, Clock, AlertTriangle, User, Filter } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { USERS } from '../data/seed'
import StatCard from '../components/StatCard'
import { RatingBadge, JenisBadge } from '../components/Badges'

export default function RekapKinerja({ onView }) {
  const { tasks } = useTasks()
  const [selectedStaf, setSelectedStaf] = useState('all')

  const stafList = useMemo(() => USERS.filter((u) => u.role === 'staf' || u.role === 'subkoor'), [])

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (selectedStaf === 'all') return true
      return t.assignee_id === selectedStaf || t.assignee.toLowerCase().includes(selectedStaf.toLowerCase())
    })
  }, [tasks, selectedStaf])

  const completedTasks = useMemo(() => {
    return filteredTasks.filter((t) => t.status === 'selesai')
  }, [filteredTasks])

  const stats = useMemo(() => {
    const totalSelesai = completedTasks.length
    let tepat = 0
    let terlambat = 0
    let baik = 0
    let cukup = 0
    let kurang = 0

    completedTasks.forEach((t) => {
      if (t.penilaian) {
        if (t.penilaian.ketepatan === 'tepat') tepat++
        else terlambat++

        if (t.penilaian.kualitas === 'baik') baik++
        else if (t.penilaian.kualitas === 'cukup') cukup++
        else if (t.penilaian.kualitas === 'kurang') kurang++
      } else {
        tepat++
        baik++
      }
    })

    const persentaseTepat = totalSelesai > 0 ? Math.round((tepat / totalSelesai) * 100) : 0

    return { totalSelesai, tepat, terlambat, baik, cukup, kurang, persentaseTepat }
  }, [completedTasks])

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Laporan Kinerja Bidang I</div>
          <h1>Rekapitulasi Kinerja Tim</h1>
          <div className="page-sub">
            Monitoring ketepatan waktu deadline dan kualitas softcopy hasil kerja staf.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            className="select"
            style={{ minWidth: 200 }}
            value={selectedStaf}
            onChange={(e) => setSelectedStaf(e.target.value)}
          >
            <option value="all">Semua Staf & Subkoor</option>
            {stafList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.jabatan})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <StatCard label="Pekerjaan Selesai" value={stats.totalSelesai} Icon={CheckCircle2} tone="leaf" />
        <StatCard label="Tepat Waktu (%)" value={`${stats.persentaseTepat}%`} Icon={Clock} tone="cobalt" />
        <StatCard label="Hasil Kualitas BAIK" value={stats.baik} Icon={Award} tone="leaf" />
        <StatCard label="Hasil CUKUP / KURANG" value={stats.cukup + stats.kurang} Icon={AlertTriangle} tone="amber" />
      </div>

      {/* Per Staf Summary Cards */}
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, marginBottom: 12 }}>Ringkasan Evaluasi Per Staf</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {stafList.map((staf) => {
            const stafTasks = tasks.filter((t) => (t.assignee_id === staf.id || t.assignee.includes(staf.name)) && t.status === 'selesai')
            const tepatCount = stafTasks.filter((t) => !t.penilaian || t.penilaian.ketepatan === 'tepat').length
            const score = stafTasks.length > 0 ? Math.round((tepatCount / stafTasks.length) * 100) : 0

            return (
              <div
                key={staf.id}
                className="card card-pad"
                style={{
                  borderTop: `4px solid ${staf.color}`,
                  cursor: 'pointer',
                  background: selectedStaf === staf.id ? 'var(--cobalt-100)' : 'var(--bg-elevated)',
                }}
                onClick={() => setSelectedStaf(staf.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div className="avatar" style={{ background: staf.color, width: 36, height: 36, fontSize: 13 }}>
                    {staf.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{staf.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{staf.jabatan}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12, background: 'var(--bg-sunken)', padding: 10, borderRadius: 8, fontSize: 12 }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Tugas Selesai</div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{stafTasks.length}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Skor Ketepatan</div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: score >= 80 ? 'var(--leaf)' : 'var(--amber)' }}>
                      {score}%
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detailed Task Evaluation Table */}
      <div className="card card-pad">
        <div className="section-title" style={{ marginBottom: 16 }}>
          Rincian Penilaian Hasil Kerja
        </div>

        {completedTasks.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada pekerjaan selesai untuk kriteria ini.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 12 }}>
                  <th style={{ padding: '10px 12px' }}>Judul Pekerjaan</th>
                  <th style={{ padding: '10px 12px' }}>Pelaksana</th>
                  <th style={{ padding: '10px 12px' }}>Jenis</th>
                  <th style={{ padding: '10px 12px' }}>Tgl Selesai</th>
                  <th style={{ padding: '10px 12px' }}>Ketepatan & Kualitas</th>
                  <th style={{ padding: '10px 12px' }}>Catatan Review</th>
                </tr>
              </thead>
              <tbody>
                {completedTasks.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => onView(t)}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{t.title}</td>
                    <td style={{ padding: '12px' }}>
                      <span className="assignee-chip" style={{ fontSize: 12 }}>
                        <User size={12} /> {t.assignee}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <JenisBadge jenis={t.jenis} kategoriRutin={t.kategori_rutin} />
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                      {t.diselesaikan_pada ? t.diselesaikan_pada.slice(0, 10) : t.deadline}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <RatingBadge penilaian={t.penilaian || { ketepatan: 'tepat', kualitas: 'baik' }} />
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 12 }}>
                      {t.komentar_review || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
