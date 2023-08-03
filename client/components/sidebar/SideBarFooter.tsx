'use client'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Avatar from '../ui/Avatar'
import LogOutModal from '../modal/LogOutModal'
import type { UserAuth } from '@/types/user'
import UserStore from '@/store/user'
import Icon from '@/components/ui/Icon'
import useModal from '@/hooks/useModal'

export default function SideBarFooter() {
  const { data: session, status } = useSession()
  const { isShow, setIsShow } = useModal()
  const setUser = UserStore(s => s.setUser)
  const user = UserStore(s => s.user)
  const handleSignIn = () => {
    signIn()
  }

  useEffect(() => {
    if (session) {
      const userInfo = session.user as UserAuth
      setUser(userInfo)
    }
  }, [session])
  return (
    <>
      {session
        ? <>
          <footer className='relative flex py-6 cursor-pointer'>
            {isShow && <LogOutModal user={user} />}
            <Avatar src='/avatar/user.png' height={15} />
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
