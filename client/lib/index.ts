import { DEFAULT_FONT_SIZE } from '@/constants'

export * from './check'
export * from './editor'
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

export function fontRatio(size: string) {
  const baseSize = Number(DEFAULT_FONT_SIZE.slice(0, 2)) // 15
  const mySize = Number(size.slice(0, 2))

  const ratio = (mySize / baseSize).toFixed(1)
  return +ratio
}
