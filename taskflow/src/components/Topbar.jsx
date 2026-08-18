import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu, Bell, Sun, Moon, LogOut, UserCircle, AlertTriangle, Clock, FileCheck, CheckCircle2, UserCheck } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'
import { USERS } from '../data/seed'

export default function Topbar({ onMenuClick, globalQuery, setGlobalQuery }) {
  const { theme, toggleTheme } = useTheme()
  const { user, switchUser, logout } = useAuth()
  const { notifications } = useTasks()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setNotifOpen(false)
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    navigate('/tasks')
  }

  return (
    <header className="topbar" ref={ref}>
      <button className="icon-btn hamburger" onClick={onMenuClick} aria-label="Buka menu">
        <Menu />
      </button>
      <form className="topbar-search" onSubmit={submitSearch}>
        <Search />
        <input
          placeholder="Cari tugas, pelaksana, atau dokumen..."
          value={globalQuery}
          onChange={(e) => setGlobalQuery(e.target.value)}
        />
      </form>

      <div className="topbar-actions">
        {/* User Role Badge Pill */}
        <span
          style={{
            background: 'var(--cobalt-100)',
            color: 'var(--cobalt)',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <UserCheck size={13} /> {user?.role === 'kabid' ? 'Kabid' : user?.role === 'subkoor' ? 'Subkoor' : 'Staf'}
        </span>

        <button className="icon-btn" onClick={toggleTheme} aria-label="Ganti tema">
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>

        {/* Notifications Dropdown */}
        <div className="dropdown">
          <button
            className="icon-btn"
            onClick={() => {
              setNotifOpen((v) => !v)
              setUserOpen(false)
            }}
            aria-label="Notifikasi"
          >
            <Bell />
            {notifications.length > 0 && <span className="notif-dot" />}
          </button>
          {notifOpen && (
            <div className="dropdown-panel" style={{ width: 320 }}>
              <div className="dropdown-head">Notifikasi Email & Sistem ({notifications.length})</div>
              {notifications.length === 0 ? (
                <div className="dropdown-empty">Tidak ada notifikasi baru.</div>
              ) : (
                notifications.slice(0, 8).map((n) => (
                  <div className="notif-item" key={n.id} style={{ display: 'flex', gap: 10, padding: 10, borderBottom: '1px solid var(--border)' }}>
                    {n.type === 'overdue' ? (
                      <AlertTriangle size={16} color="var(--coral)" style={{ marginTop: 2 }} />
                    ) : n.type === 'approval' ? (
                      <FileCheck size={16} color="var(--leaf)" style={{ marginTop: 2 }} />
                    ) : (
                      <Clock size={16} color="var(--amber)" style={{ marginTop: 2 }} />
                    )}
                    <div>
                      <div className="body" style={{ fontSize: 12, lineHeight: 1.4 }}>{n.text}</div>
                      <div className="time" style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 2 }}>{n.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Account Switcher Dropdown */}
        <div className="dropdown">
          <button
            className="avatar"
            style={{ border: 'none', background: user?.color || 'var(--cobalt)', cursor: 'pointer' }}
            onClick={() => {
              setUserOpen((v) => !v)
              setNotifOpen(false)
            }}
            aria-label="Menu pengguna"
          >
            {user?.initials || 'KB'}
          </button>
          {userOpen && (
            <div className="dropdown-panel" style={{ width: 240 }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{user?.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user?.jabatan}</div>
              </div>

              <div style={{ padding: '6px 12px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                Ganti Peran Pengguna (Simulasi)
              </div>

              {USERS.map((u) => (
                <button
                  key={u.id}
                  className="menu-item"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: u.id === user?.id ? 'var(--bg-sunken)' : 'transparent',
                    fontWeight: u.id === user?.id ? 700 : 400,
                  }}
                  onClick={() => {
                    switchUser(u.id)
                    setUserOpen(false)
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: u.color }} />
                  {u.name} <span style={{ fontSize: 10, opacity: 0.7 }}>({u.role})</span>
                </button>
              ))}

              <div style={{ borderTop: '1px solid var(--border)', marginTop: 4 }}>
                <a className="menu-item" href="#" onClick={(e) => { e.preventDefault(); logout(); navigate('/login') }}>
                  <LogOut /> Keluar
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

