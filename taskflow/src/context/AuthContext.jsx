import { createContext, useContext, useEffect, useState } from 'react'
import { readStore, writeStore } from '../utils/storage'
import { USERS, DEMO_USER } from '../data/seed'

const AuthContext = createContext(null)

function seedUsers() {
  const existing = readStore('taskflow_users', null)
  if (existing && existing.length >= USERS.length) return existing
  writeStore('taskflow_users', USERS)
  return USERS
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStore('taskflow_session', null) || DEMO_USER)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    seedUsers()
    setReady(true)
  }, [])

  const login = ({ email, password }) => {
    const users = readStore('taskflow_users', USERS)
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    )
    if (!found) return { ok: false, error: 'Email atau kata sandi salah.' }
    const { password: _pw, ...safeUser } = found
    setUser(safeUser)
    writeStore('taskflow_session', safeUser)
    return { ok: true }
  }

  const switchUser = (userId) => {
    const users = readStore('taskflow_users', USERS)
    const found = users.find((u) => u.id === userId)
    if (found) {
      const { password: _pw, ...safeUser } = found
      setUser(safeUser)
      writeStore('taskflow_session', safeUser)
    }
  }

  const register = ({ name, email, password }) => {
    const users = readStore('taskflow_users', USERS)
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, error: 'Email sudah terdaftar. Silakan masuk.' }
    }
    const initials = name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join('')
    const newUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      password,
      role: 'staf',
      jabatan: 'Staf Pelaksana',
      initials: initials || 'U',
    }
    const nextUsers = [...users, newUser]
    writeStore('taskflow_users', nextUsers)
    const { password: _pw, ...safeUser } = newUser
    setUser(safeUser)
    writeStore('taskflow_session', safeUser)
    return { ok: true }
  }

  const updateProfile = (patch) => {
    const users = readStore('taskflow_users', USERS)
    const nextUsers = users.map((u) => (u.id === user.id ? { ...u, ...patch } : u))
    writeStore('taskflow_users', nextUsers)
    const nextUser = { ...user, ...patch }
    setUser(nextUser)
    writeStore('taskflow_session', nextUser)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('taskflow_session')
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, switchUser, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

