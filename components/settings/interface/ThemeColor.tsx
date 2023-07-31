'use client'

import cn from 'clsx'
import useI18n from '@/hooks/useI18n'
import useThemeColors from '@/hooks/useThemeColors'
import themes from '@/constants/themes'

function ThemeColor() {
  const t = useI18n('settings.interface')
  const { themeColor, setThemeColor } = useThemeColors()

  return (
    <div className=''>
      <p className="font-medium">{t('theme_color')}</p>
      <div className="flex flex-wrap gap-4 p-2">
        {themes.map(([key]) => (
          <button
            key={key}
            style={{
              background: key,
            }}
            className={cn('w-8 h-8 rounded-full transition-all ', themeColor === key ? `ring-2  ring-[${key}]` : 'scale-90')}
            onClick={() => setThemeColor(key)}
          >
          </button>
        ))}

      </div>
    </div>
  )
}

export default ThemeColor
