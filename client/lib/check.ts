export function checkIsDarkMode() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  catch (err) {
    return false
  }
}

export function isActiveNav(level: number, navName: string, pathName: string) {
  const arr = pathName.split('/')
  if (arr.includes('zh'))
    return arr[level + 1] === navName
  return arr[level] === navName
}
