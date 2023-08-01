import { useEffect, useState } from 'react'
import { DEFAULT_FONT_SIZE } from '@/constants'

function useFontSize() {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--font-size', fontSize)
  }, [fontSize])

  return {
    fontSize,
    setFontSize,
  }
}

export default useFontSize
