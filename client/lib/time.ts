export function getTimeAgo(date: Date): [string, number?] {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  // 将时间差转换为秒、分钟、小时、天、周、月和年
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 180)
    return ['just_now']

  else if (hours < 1)
    return ['minutes', minutes]

  else if (days < 1)
    return ['hours', hours]

  else if (days < 7)
    return ['days', days]

  else if (days < 31)
    return ['weeks', weeks]

  else if (years < 1)
    return ['months', months]

  else
    return ['years', years]
}

