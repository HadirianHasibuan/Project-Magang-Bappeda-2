import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

function Toggle({ on, onClick }) {
  return (
    <button className={`toggle ${on ? 'on' : ''}`} onClick={onClick} type="button" aria-pressed={on}>
      <span className="knob" />
    </button>
  )
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const [prefs, setPrefs] = useState({
    emailNotif: true,
    deadlineReminder: true,
    weeklySummary: false,
  })

  const flip = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }))

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Preferensi</div>
          <h1>Settings</h1>
          <div className="page-sub">Sesuaikan tampilan dan notifikasi aplikasi.</div>
        </div>
      </div>

      <div className="card card-pad" style={{ maxWidth: 560, marginBottom: 18 }}>
        <div className="section-title">Tampilan</div>
        <div className="settings-row">
          <div>
            <div className="t">Mode Gelap</div>
            <div className="d">Beralih antara tampilan terang dan gelap.</div>
          </div>
          <Toggle on={theme === 'dark'} onClick={toggleTheme} />
        </div>
      </div>

      <div className="card card-pad" style={{ maxWidth: 560, marginBottom: 18 }}>
        <div className="section-title">Notifikasi</div>
        <div className="settings-row">
          <div>
            <div className="t">Notifikasi Email</div>
            <div className="d">Terima ringkasan aktivitas task lewat email.</div>
          </div>
          <Toggle on={prefs.emailNotif} onClick={() => flip('emailNotif')} />
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Pengingat Deadline</div>
            <div className="d">Dapatkan pengingat saat task mendekati tenggat waktu.</div>
          </div>
          <Toggle on={prefs.deadlineReminder} onClick={() => flip('deadlineReminder')} />
        </div>
        <div className="settings-row">
          <div>
            <div className="t">Ringkasan Mingguan</div>
            <div className="d">Ringkasan progress task setiap awal minggu.</div>
          </div>
          <Toggle on={prefs.weeklySummary} onClick={() => flip('weeklySummary')} />
        </div>
      </div>

      <div className="card card-pad" style={{ maxWidth: 560 }}>
        <div className="section-title">Akun</div>
        <div className="settings-row">
          <div>
            <div className="t">Keluar dari akun</div>
            <div className="d">Anda akan diarahkan kembali ke halaman masuk.</div>
          </div>
          <button className="btn btn-danger" onClick={logout}>
            Keluar
          </button>
        </div>
      </div>
    </div>
  )
}
