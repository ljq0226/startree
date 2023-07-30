'use client'
import useI18n from '@/hooks/useI18n'
import Aside from '@/components/aside/Aside'

export default function App() {
  const t = useI18n('nav')
  return (
    <>
      <div className="main-container">
        {t('home')}
      </div>
      <Aside />
    </>

  )
}
