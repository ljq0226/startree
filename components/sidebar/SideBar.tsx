'use client'
import Link from 'next/link'
import cn from 'clsx'
import { NavLinks } from './data'
import useI18n from '@/hooks/useI18n'
import Icon from '@/components/ui/Icon'

function SideBar() {
  const t = useI18n('nav')
  return (
    <div className='max-w-[300px]'>
      <div className="flex flex-col w-full ">
        {
          NavLinks.map((nav) => {
            return (
              <div className={cn('navLink', nav.addPadding && 'my-4')} key={nav.href}>
                <Link href={nav.href} className='w-full'>
                  <div className="flex">
                    <div className='flex flex-center'>
                      <Icon icon={nav.iconName} />
                    </div>
                    <p className='hidden ml-4 xl:flex xl:flex-center text-primary'>{t(nav.linkName)}</p>
                  </div>
                </Link>
              </div>
            )
          })
        }

      </div>

    </div>
  )
}

export default SideBar
