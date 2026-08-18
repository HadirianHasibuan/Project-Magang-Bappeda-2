import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function MainLayout({ globalQuery, setGlobalQuery }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />
      <div className="main-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} globalQuery={globalQuery} setGlobalQuery={setGlobalQuery} />
        <Outlet />
      </div>
    </div>
  )
}
