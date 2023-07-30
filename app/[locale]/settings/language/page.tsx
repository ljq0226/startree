'use client'
import useI18n from '@/hooks/useI18n'
import LocaleSwitcher from '@/components/settings/language/LocaleSwitcher'

function page() {
  const t = useI18n('settings.language')
  return (
    < >
      <div className='flex flex-col px-4 py-2 space-y-2'>
        <p className='font-medium'>{t('display_language')}</p>
        <LocaleSwitcher />
      </div>

    </>
  )
}

export default page
