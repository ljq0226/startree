'use client'
import { useRouter } from 'next/navigation'
import Avatar from '../ui/Avatar'
import { NavLinks } from './data'
import SideBarLink from './SideBarLink'
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
      <div className='sticky top-0 h-[100vh] w-8 xl:w-full flex flex-col'>
        <header className="flex">
          header
          <div className='cursor-pointer' onClick={() => {
            router.back()
          }}>
            <Icon icon='uil:arrow-left' className='text-primary' />
          </div>

        </header>
        <div className="flex flex-col w-full ">
          {
            NavLinks.map((nav) => {
              return (
                <SideBarLink {...nav} key={nav.href} />
              )
            })
          }

        </div>
        <div className="flex-1"></div>
        <footer className='flex py-6 cursor-pointer'>
          <Avatar src='/avatar/user.png' />
          <div className="flex flex-col justify-center flex-1 px-2 rounded-xl hover-animation" >
            <p className="text-primary">
              userName
            </p>
            <p className='text-border-dark'>
              @userNickName
            </p>
          </div>
          <div className="flex flex-center">
            <Icon icon='ri:more-2-line'></Icon>
          </div>
        </footer>
      </div>
    </div>

  )
}

export default SideBar
