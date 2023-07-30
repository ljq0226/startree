import { shallow } from 'zustand/shallow'
import { useEffect } from 'react'
import SettingsStore from '@/store/settings'
import { THEME_MODE } from '@/constants'
import type { ThemeMode } from '@/types/theme'

function useThemeMode() {
  const [themeMode, setThemeMode] = SettingsStore(s => [s.themeMode, s.setThemeMode], shallow)

  useEffect(() => {
    const mode = localStorage.getItem(THEME_MODE) as ThemeMode
    if (!mode)
      localStorage.setItem(THEME_MODE, themeMode)
    else
      setThemeMode(mode)
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (themeMode === 'dark')
      root.classList.add('dark')
    else root.classList.remove('dark')

    localStorage.setItem(THEME_MODE, themeMode)
  }, [themeMode])
  return { themeMode, setThemeMode }
}

export default useThemeMode
