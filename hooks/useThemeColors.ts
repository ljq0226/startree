import { useEffect, useState } from 'react'
import themes from '@/constants/themes'

const initTheme = themes[0][0] as string
function useThemeColors() {
  const [themeColor, setThemeColor] = useState(initTheme)
  const root = document.documentElement
  useEffect(() => {
    const theme: any = themes.filter(item => item[0] === themeColor)[0][1]

    for (const key in theme)
      root.style.setProperty(key, theme[key])
  }, [themeColor])

  return { themeColor, setThemeColor }
}

export default useThemeColors
