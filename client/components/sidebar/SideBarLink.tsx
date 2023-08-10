'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import cn from 'clsx'
import Tooltip from '../ui/Tooltip'
import type { NavLink } from './data'
import Icon from '@/components/ui/Icon'
import useI18n from '@/hooks/theme/useI18n'
import { isActiveNav } from '@/lib/check'
import { UserStore } from '@/store'

type SidebarLinkProps = NavLink & {
  username?: string
}
function SideBarLink({
  href,
  iconName,
  linkName,
  disabled,
  addPadding,
}: SidebarLinkProps) {
  const asPath = usePathname()
  const t = useI18n('nav')
  const isActive = isActiveNav(1, linkName, asPath)
  const { name } = UserStore(s => s.user)
  const isDisabled = disabled && !name

  return (
    <div className={cn('navLink', addPadding && 'my-4', isDisabled && 'cursor-not-allowed')} key={href}>
      <Tooltip text={t(linkName)} className='w-full'>
        <Link aria-disabled href={href} className={cn(isDisabled && 'pointer-events-none text-secondary-light')}>
          <div className={cn('flex', isActive ? 'text-primary' : '')} >
            <div className='flex flex-center'>
              <Icon icon={iconName} />
            </div>
            <p className='hidden ml-4 xl:flex xl:flex-center'>{t(linkName)}</p>
          </div>
        </Link>
      </Tooltip>
    </div>
  )
}

export default SideBarLink
