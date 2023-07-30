'use client'

import { usePathname } from 'next/navigation'
import cn from 'clsx'
import Link from 'next/link'
import useI18n from '@/hooks/useI18n'
import Icon from '@/components/ui/Icon'

interface Props {
  href: string
  linkName: string
  icon?: string
}

function SettingsItem({ linkName, icon, href }: Props) {
  const asPath = usePathname()
  const pathName = asPath.split('/').pop()
  const t = useI18n('settings')

  return (
    <div className='flex h-[42px] min-w-[285px] rounded-xl px-4 my-2 py-2 hover-animation hover:bg-gray-300'>
      <Link
        className='flex w-full'
        href={`/settings/${href}`}
      >
        <div className={cn('flex flex-1', linkName === pathName ? 'text-primary' : '')} >
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
