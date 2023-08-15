'use client'
import React from 'react'
import cn from 'clsx'
import { signOut } from 'next-auth/react'
import Icon from '../ui/Icon'
import useModal from '@/hooks/useModal'
import type { UserAuth } from '@/types/user'
import useI18n from '@/hooks/theme/useI18n'

interface Props {
  user: UserAuth
}
function LogOutModal({ user }: Props) {
  const { setIsShow } = useModal()
  const t = useI18n('user')
  const handleSignOut = () => {
    signOut()
    setIsShow(false)
  }
  return (
    <>
      <div
        className={cn('absolute rounded-xl hover-animation flex flex-center left-1 -top-8 w-64 h-12 drop-shadow-2xl p-2 border border-base')}
        onClick={() => { handleSignOut() }}
      >
        <Icon icon='lucide:log-out' />
        <span className='ml-4'>{t('sign_out')} <span className='text-secondary'>@{user.name}</span> </span>
      </div>
    </>
  )
}

export default LogOutModal
