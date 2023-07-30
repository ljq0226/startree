'use client'
import { NavLinks } from './data'
import SideBarLink from './SideBarLink'
import useI18n from '@/hooks/useI18n'

function SideBar() {
  const t = useI18n('nav')
  return (
    <div className=''>
      <div className='sticky top-0 h-[100vh] w-8 xl:w-full'>
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
    </div>

  )
}

export default SideBar
