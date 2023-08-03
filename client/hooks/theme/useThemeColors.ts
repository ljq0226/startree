import { useEffect, useState } from 'react'
import themes from '@/constants/themes'
import { THEME_COLOR } from '@/constants'

const initTheme = themes[0][0] as string
function setRootStyle(themeColor: string) {
  const root = document.documentElement
  const theme: any = themes.filter(item => item[0] === themeColor)[0][1]
  for (const key in theme)
    root.style.setProperty(key, theme[key])
  localStorage.setItem(THEME_COLOR, themeColor)
}
function useThemeColors() {
  const [themeColor, setThemeColor] = useState(initTheme)

  useEffect(() => {
    const themecolor = localStorage.getItem(THEME_COLOR) as string
    if (!themecolor)
      localStorage.setItem(THEME_COLOR, themeColor)
    else
      setThemeColor(themecolor)
  }, [])

  useEffect(() => {
    setRootStyle(themeColor)
  }, [themeColor])

  return { themeColor, setThemeColor }
}

export default useThemeColors
