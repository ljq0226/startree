'use client'
import { NavLinks } from './data'
import SideBarLink from './SideBarLink'
import useI18n from '@/hooks/useI18n'

function SideBar() {
  const t = useI18n('nav')
  return (
    <div className='max-w-[300px]'>
      <div className="flex flex-col w-full ">
        {
          NavLinks.map((nav) => {
            return (
              <SideBarLink {...nav} key={nav.href} />
            )
          })
        }

      </div>

    </div>
  )
}

export default SideBar
