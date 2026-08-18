import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ListChecks, Kanban, CalendarDays, BarChart3, UserCircle, Settings, CheckSquare } from 'lucide-react'
import { useAuth } from '../context/AuthContext'


const LINKS = [
  { to: '/', label: 'Dashboard', Icon: LayoutDashboard, end: true },
  { to: '/tasks', label: 'Daftar Tugas', Icon: ListChecks },
  { to: '/kanban', label: 'Papan Kanban', Icon: Kanban },
  { to: '/calendar', label: 'Kalender RKPD', Icon: CalendarDays },
  { to: '/rekap', label: 'Rekap Kinerja', Icon: BarChart3 },
  { to: '/profile', label: 'Profil Saya', Icon: UserCircle },
  { to: '/settings', label: 'Pengaturan', Icon: Settings },
]

export default function Sidebar({ open, onNavigate }) {
  const { user } = useAuth()
  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="mark">
            <CheckSquare size={17} />
          </div>
          <span>Bappeda TaskFlow</span>
        </div>
        <nav className="sidebar-nav">
          {LINKS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">
          <NavLink to="/profile" onClick={onNavigate} className="sidebar-user">
            <div className="avatar" style={{ background: user?.color || 'var(--cobalt)' }}>
              {user?.initials || 'KB'}
            </div>
            <div className="sidebar-user-info">
              <div className="name">{user?.name}</div>
              <div className="role" style={{ fontSize: 11 }}>{user?.jabatan || user?.role}</div>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  )
}

