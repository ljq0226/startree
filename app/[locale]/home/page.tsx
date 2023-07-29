'use client'
import useI18n from '@/hooks/useI18n'
import LocaleSwitcher from '@/components/LocaleSwitcher'

export default function App() {
  const t = useI18n('nav')
  return (
    <div className="main-container">
      {t('home')}
      <LocaleSwitcher />
    </div>

  )
}
