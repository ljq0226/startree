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
  const isActive = false
  const t = useI18n()
  return (
    <Link href={href}>
      <div
        className={cn(
          'flex py-1 outline-none',
          disabled && 'cursor-not-allowed',
          addPadding && 'py-6',
        )}
      >
        <div
          className={cn(
            'text-xl custom-button flex items-center justify-center self-start p-2',
            isActive && 'font-bold',
          )}
        >
          <Icon icon={iconName} />
          <p className='hidden ml-4 xl:block'>{t(linkName)}</p>
        </div>
      </div>
    </Link>
  )
}

export default SideBarLink
