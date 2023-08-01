import { DEFAULT_FONT_SIZE } from '@/constants'

export function createFontArr(range = 5) {
  const fontSizeArr = []
  fontSizeArr.push(DEFAULT_FONT_SIZE)
  const baseSize = Number(DEFAULT_FONT_SIZE.slice(0, 2)) // 15
  let upBase = baseSize
  let downBase = baseSize
  while (range--) {
    fontSizeArr.push(`${upBase + 1}px`)
    fontSizeArr.unshift(`${downBase - 1}px`)
    upBase++
    downBase--
  }
  return fontSizeArr
}
