'use client'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from '@/components/LocaleSwitcher'

export default function App() {
  const t = useTranslations('IndexPage')
  return (
    <p className="max-w-[590px]">
      {t('title')}
      <LocaleSwitcher />
    </p>
  )
}
