import { create } from 'zustand'
import type { ThemeMode } from '@/types/theme'

interface StoreState {
  themeMode: ThemeMode
  // themeColors: ThemeColors

  setThemeMode: (v: ThemeMode) => void

}

const SettingsStore = create<StoreState>(set => ({
  themeMode: 'dark',
  // themeColors: {},
  setThemeMode: v => set(() => ({
    themeMode: v,
  })),
}))

export { SettingsStore }
