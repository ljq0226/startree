'use client'

import useI18n from '@/hooks/useI18n'
import themes from '@/constants/themes.json'
import type { ThemeColors } from '@/types/theme'
// import useColors from '@/hooks/useThemeColors'

function ThemeColor() {
  const t = useI18n('settings.interface')
  // const [settings, setSettings] = useColors()
  // const currentTheme = settings.themeColors?.['--theme-color-name'] || themes[0][0]

  // function updateTheme(theme: ThemeColors) {
  //   setSettings({ ...settings, themeColors: theme })
  // }
  return (
    <div>
      <p className="font-medium">{t('theme_color')}</p>
      {/* <div className="flex flex-wrap gap-4 p-2">
        {themes.map(([key, theme]) => (
          <button
            key={key}
            // style={{
            //   'background': key,
            //   '--local-ring-color': key,
            // }}
            className={`w-8 h-8 rounded-full transition-all ${currentTheme === key ? 'ring-2' : 'scale-90'
              }`}
            // title={key}
            onClick={() => updateTheme(theme)}
          ></button>
        ))}
      </div> */}

    </div>
  )
}

export default ThemeColor
