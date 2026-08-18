import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays, FileText } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { RKPD_MILESTONES } from '../data/seed'
import TaskRow from '../components/TaskRow'

const DOW = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function toStr(d) {
  return d.toISOString().slice(0, 10)
}

export default function CalendarPage({ onView }) {
  const { tasks } = useTasks()
  const [cursor, setCursor] = useState(new Date())
  const [selected, setSelected] = useState(toStr(new Date()))

  const milestonesByDate = useMemo(() => {
    const map = {}
    RKPD_MILESTONES.forEach((m) => {
      if (!map[m.deadline]) map[m.deadline] = []
      map[m.deadline].push(m)
    })
    return map
  }, [])

  const tasksByDate = useMemo(() => {
    const map = {}
    tasks.forEach((t) => {
      if (!map[t.deadline]) map[t.deadline] = []
      map[t.deadline].push(t)
    })
    return map
  }, [tasks])

  const cells = useMemo(() => {
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const firstDay = new Date(year, month, 1)
    const startOffset = firstDay.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const list = []
    for (let i = startOffset - 1; i >= 0; i--) {
      list.push({ date: new Date(year, month - 1, daysInPrevMonth - i), muted: true })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      list.push({ date: new Date(year, month, d), muted: false })
    }
    while (list.length % 7 !== 0 || list.length < 42) {
      const last = list[list.length - 1].date
      const next = new Date(last)
      next.setDate(next.getDate() + 1)
      list.push({ date: next, muted: true })
      if (list.length >= 42) break
    }
    return list
  }, [cursor])

  const todayStr = toStr(new Date())
  const selectedTasks = tasksByDate[selected] || []
  const selectedMilestones = milestonesByDate[selected] || []

  const changeMonth = (delta) => {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1))
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Agenda Perencanaan Bappeda</div>
          <h1>Kalender RKPD & Penugasan</h1>
          <div className="page-sub">Pantau tahapan resmi penyusunan RKPD Murni & Perubahan beserta deadline tugas.</div>
        </div>
      </div>

      <div className="card card-pad">
        <div className="cal-head">
          <h3>
            {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
          </h3>
          <div className="cal-nav">
            <button className="btn btn-icon btn-ghost" onClick={() => changeMonth(-1)}>
              <ChevronLeft size={17} />
            </button>
            <button className="btn btn-sm btn-ghost" onClick={() => { setCursor(new Date()); setSelected(todayStr) }}>
              Hari Ini
            </button>
            <button className="btn btn-icon btn-ghost" onClick={() => changeMonth(1)}>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
        <div className="cal-grid">
          {DOW.map((d) => (
            <div className="cal-dow" key={d}>
              {d}
            </div>
          ))}
          {cells.map(({ date, muted }, i) => {
            const ds = toStr(date)
            const dayTasks = tasksByDate[ds] || []
            const dayMs = milestonesByDate[ds] || []
            return (
              <div
                key={i}
                className={`cal-cell ${muted ? 'muted' : ''} ${ds === todayStr ? 'today' : ''} ${ds === selected ? 'selected' : ''}`}
                onClick={() => setSelected(ds)}
              >
                <span className="cal-date">{date.getDate()}</span>
                <div className="cal-dot-row">
                  {dayMs.map((m) => (
                    <span key={m.id} className="cal-dot" style={{ background: '#6366f1', width: 7, height: 7 }} title={m.nama} />
                  ))}
                  {dayTasks.slice(0, 3).map((t) => (
                    <span key={t.id} className="cal-dot" style={{ background: t.jenis === 'rutin' ? 'var(--cobalt)' : '#ec4899' }} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="cal-day-panel">
        <div className="section-title">
          <span>Agenda & Tugas pada {selected}</span>
        </div>

        {selectedMilestones.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {selectedMilestones.map((m) => (
              <div key={m.id} style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid #6366f1', borderRadius: 10, padding: 12, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileText color="#6366f1" size={20} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase' }}>
                    Tahapan Resmi {m.kategori === 'rkpd_murni' ? 'RKPD Murni 2027' : 'RKPD Perubahan 2026'}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{m.nama}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTasks.length === 0 && selectedMilestones.length === 0 ? (
          <div className="card empty-state">
            <CalendarDays size={32} color="var(--text-faint)" />
            <h3>Tidak ada agenda/deadline</h3>
            <p>Tidak ada tugas atau milestone RKPD di tanggal ini.</p>
          </div>
        ) : (
          <div className="task-list">
            {selectedTasks.map((t) => (
              <TaskRow key={t.id} task={t} onView={onView} onEdit={onView} onDelete={onView} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

