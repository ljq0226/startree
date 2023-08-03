'use client'
import { useRouter } from 'next/navigation'
import Tooltip from '../ui/Tooltip'
import { NavLinks } from './data'
import SideBarLink from './SideBarLink'
import SideBarFooter from './SideBarFooter'
import useThemeMode from '@/hooks/theme/useThemeMode'
import useI18n from '@/hooks/theme/useI18n'
import useThemeColors from '@/hooks/theme/useThemeColors'
import Icon from '@/components/ui/Icon'

function SideBar() {
  const t = useI18n('nav')
  const router = useRouter()

  useThemeColors()
  useThemeMode()
  return (
    <div className=''>
      <div className='sticky top-0 h-[100vh] w-8 sm:w-min-[70px] xl:w-full flex flex-col'>
        <header className="flex">
          header
          <Tooltip text={t('back')}>
            <div className='cursor-pointer' onClick={() => {
              router.back()
            }}>
              <Icon icon='uil:arrow-left' className='text-primary' />
            </div>
          </Tooltip>
        </header>
        <div className="flex flex-col w-full cursor-pointer">
          {
            NavLinks.map((nav) => {
              return (
                <SideBarLink {...nav} key={nav.href} />
              )
            })
          }

        </div>
        <div className="flex-1"></div>
        <SideBarFooter />
      </div>
    </div>

  )
}

export default SideBar
