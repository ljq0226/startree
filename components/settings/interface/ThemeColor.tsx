'use client'
import useI18n from '@/hooks/useI18n'

function ThemeColor() {
  const t = useI18n('settings.interface')
  return (
    <div>
      <p className="font-medium">{t('theme_color')}</p>
    </div>
  )
}

export default ThemeColor
