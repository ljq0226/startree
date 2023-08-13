'use client'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Avatar from '../ui/Avatar'
import LogOutModal from '../modal/LogOutModal'
import { UserStore } from '@/store'
import Icon from '@/components/ui/Icon'
import useModal from '@/hooks/useModal'
import useLogin from '@/hooks/useLogin'

export default function SideBarFooter() {
  const { isShow, setIsShow } = useModal()
  const user = UserStore(s => s.user)
  const { name, image } = user
  const { session } = useLogin()
  const handleSignIn = () => {
    signIn()
    setTimeout(() => {
      redirect('/expore')
    }, 300)
  }
  return (
    <>
      {session
        ? <>
          <footer className='relative flex py-6 cursor-pointer'>
            {isShow && <LogOutModal user={user} />}
            <Link href={`/user/${name}`}>
              <div className="flex">
                <Avatar src={image || '/avatar/user.png'} height={15} />
                <div className="flex flex-col justify-center flex-1 px-2 rounded-xl hover-animation" >
                  <p className="text-primary">
                    {name}
                  </p>
                  <p className='text-border-dark'>
                    {`@${name}`}
                  </p>
                </div>
              </div>

            </Link>

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
