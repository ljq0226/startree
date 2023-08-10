'use client'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Avatar from '../ui/Avatar'
import LogOutModal from '../modal/LogOutModal'
import { UserStore } from '@/store'
import Icon from '@/components/ui/Icon'
import useModal from '@/hooks/useModal'
import useLogin from '@/hooks/useLogin'

export default function SideBarFooter() {
  const { isShow, setIsShow } = useModal()
  const user = UserStore(s => s.user)
  const { session } = useLogin()
  const handleSignIn = () => {
    signIn()
    redirect('/expore')
  }
  return (
    <>
      {session
        ? <>
          <footer className='relative flex py-6 cursor-pointer'>
            {isShow && <LogOutModal user={user} />}
            <Avatar src={user.image || '/avatar/user.png'} height={15} />
            <div className="flex flex-col justify-center flex-1 px-2 rounded-xl hover-animation" >
              <p className="text-primary">
                {user.name}
              </p>
              <p className='text-border-dark'>
                {`@${user.name}`}
              </p>
            </div>
            <div
              onClick={() => {
                setIsShow(true)
              }}
              className="flex flex-center hover-animation rounded-xl">
              <Icon icon='ri:more-2-line'></Icon>
            </div>
          </footer >
        </>
        : <footer className='py-4'>
          <div
            className='flex w-full h-12 cursor-pointer bg-primary text-bs rounded-xl flex-center '
            onClick={() => handleSignIn()}
          >
            Sign in
          </div>
        </footer>
      }
    </>

  )
}
