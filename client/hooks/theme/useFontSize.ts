import { useEffect, useState } from 'react'
import { DEFAULT_FONT_SIZE, FONT_SIZE } from '@/constants'
import { fontRatio } from '@/lib'

function useFontSize() {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)
  const [ratio, setRatio] = useState(1)

  useEffect(() => {
    const fontsize = localStorage.getItem(FONT_SIZE) as string
    if (!fontsize)
      localStorage.setItem(FONT_SIZE, fontSize)
    else
      setFontSize(fontsize)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--font-size', fontSize)
    localStorage.setItem(FONT_SIZE, fontSize)
    setRatio(fontRatio(fontSize))
  }, [fontSize])

  return {
    ratio,
    fontSize,
    setFontSize,
  }
}

export default useFontSize
