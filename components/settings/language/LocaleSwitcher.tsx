'use client'

import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next-intl/client'
import type { ChangeEvent } from 'react'
import { useTransition } from 'react'
import Icon from '@/components/ui/Icon'

export default function LocaleSwitcher() {
  const t = useTranslations('settings.language')
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <label
      className={clsx(
        'w-full relative text-gray-400 border border-base ',
        isPending && 'transition-opacity [&:disabled]:opacity-30',
      )}
    >
      <select
        className="inline-flex w-full py-3 pl-2 pr-6 bg-transparent appearance-none"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {['en', 'zh'].map(cur => (
          <option key={cur} value={cur}>
            {t('locale', { locale: cur })}
          </option>
        ))}
      </select>
      <Icon icon='mingcute:down-fill' height={20} className='absolute pointer-events-none right-2 top-[10px]' />
    </label>
  )
}
