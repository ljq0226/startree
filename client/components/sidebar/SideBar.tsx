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
    <div className='sticky top-0 h-[100vh] sm:w-min-[70px] xl:w-min-[300px] flex flex-col'>
      <header className="flex items-center justify-start px-5 py-2">
        <div className='logofont'>StarTree</div>
        <div className='flex-[0.5]'></div>
        <Tooltip text={t('back')}>
          <div className='cursor-pointer' onClick={() => {
            router.back()
          }}>
            <Icon icon='uil:arrow-left' className='text-primary' height={26} />
          </div>
        </Tooltip>
      </header>
      <div className="flex flex-col w-full">
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

  )
}

export default SideBar
