'use client'
import { NavLinks } from './data'
import SideBarLink from './SideBarLink'
import useThemeMode from '@/hooks/theme/useThemeMode'
import useI18n from '@/hooks/theme/useI18n'
import useThemeColors from '@/hooks/theme/useThemeColors'

function SideBar() {
  const t = useI18n('nav')
  useThemeColors()
  useThemeMode()
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
