'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import cn from 'clsx'

import type { NavLink } from './data'
import Icon from '@/components/ui/Icon'
import useI18n from '@/hooks/useI18n'

type SidebarLinkProps = NavLink & {
  username?: string
}
function SideBarLink({
  href,
  iconName,
  linkName,
  disabled,
  canBeHidden,
  addPadding,
}: SidebarLinkProps) {
  const asPath = usePathname()
  const t = useI18n('nav')
  const navName = asPath.split('/').pop()

  return (
    <div className={cn('navLink', addPadding && 'my-4')} key={href}>
      <Link href={href} className='w-full'>
        <div className={cn('flex', navName === linkName ? 'text-primary' : '')} >
          <div className='flex flex-center'>
            <Icon icon={iconName} />
          </div>
          <p className='hidden ml-4 xl:flex xl:flex-center'>{t(linkName)}</p>
        </div>
      </Link>
    </div>
  )
}

export default SideBarLink
