import { createContext, useContext, useEffect, useState } from 'react'
import { readStore, writeStore } from '../utils/storage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => readStore('taskflow_theme', 'light'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    writeStore('taskflow_theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
