'use client'

import { usePathname } from 'next/navigation'
import cn from 'clsx'
import Link from 'next/link'
import useI18n from '@/hooks/theme/useI18n'
import Icon from '@/components/ui/Icon'
import { isActiveNav } from '@/lib/check'

interface Props {
  href: string
  linkName: string
  icon?: string
}

function SettingsItem({ linkName, icon, href }: Props) {
  const asPath = usePathname()
  const isActive = isActiveNav(2, linkName, asPath)
  const t = useI18n('settings')

  return (
    <div className='settingsItem'>
      <Link
        className='flex w-full'
        href={`/settings/${href}`}
      >
        <div className={cn('flex flex-1', isActive ? 'text-primary' : '')} >
          <div>
            {icon && <Icon icon={icon} />}
          </div>
          <p className='flex ml-4 flex-center'>{t(`${linkName}.label`)}</p>
        </div>
        <div className="flex flex-center" >
          <Icon icon='ri:arrow-right-line' height={18} />
        </div>
      </Link>
    </div >
  )
}

export default SettingsItem
