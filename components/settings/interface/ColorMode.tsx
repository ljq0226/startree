'use client'
import cn from 'clsx'
import { useEffect, useState } from 'react'
import useI18n from '@/hooks/useI18n'
import Icon from '@/components/ui/Icon'
import useThemeMode from '@/hooks/useThemeMode'
import type { ThemeMode } from '@/types/theme'
import { checkIsDarkMode } from '@/lib/check'

interface ModeProps {
  mode: ThemeMode
  icon: string
}

function Mode({ mode, icon }: ModeProps) {
  const { themeMode, setThemeMode } = useThemeMode()
  const [activeMode, setActiveMode] = useState('system')

  const isDark = checkIsDarkMode()
  const t = useI18n('settings.interface')
  const clickHandle = () => {
    setActiveMode(mode)
    if (mode === 'system')
      setThemeMode(isDark ? 'dark' : 'light')
    else
      setThemeMode(mode)
  }
  useEffect(() => {
    setActiveMode(themeMode)
  }, [themeMode])
  return (
    <div
      className={cn('colorMode flex-wrap')}
      onClick={clickHandle}
    >
      <div className={cn('flex', mode === activeMode ? 'text-primary' : 'text-secondary hover:text-secondary-light')}>
        <Icon icon={icon} />
        <p className='flex ml-1 flex-center'>{t(`${mode}_mode`)}</p>
      </div>
    </div>

  )
}

function ColorMode() {
  const t = useI18n('settings.interface')
  return (
    <div>
      <p className="font-medium">{t('color_mode')}</p>
      <div className="flex w-full p-2 space-x-4">
        <Mode icon='ri:moon-line' mode='dark' />
        <Mode icon='ri:sun-line' mode='light' />
        <Mode icon='ri:computer-line' mode='system' />
      </div></div>
  )
}

export default ColorMode
