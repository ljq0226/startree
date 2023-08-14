'use client'
import React from 'react'
import { motion } from 'framer-motion'
import FollowButton from '../user/FollowButton'
import type { ProfileCount, UserProfile } from '@/types'
import Avatar from '@/components/ui/Avatar'
import { UserStore } from '@/store'
import useI18n from '@/hooks/theme/useI18n'

interface Props {
  profileCount: ProfileCount
  user: UserProfile
  setIsShowPanel: (v: boolean) => void
}

function UserProfileModal({ user, profileCount, setIsShowPanel }: Props) {
  const { name } = UserStore(s => s.user)
  const t = useI18n('account')
  return (
    <motion.div
      className='userProfileModal'
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e: React.MouseEvent) => { e.stopPropagation() }}
      onMouseLeave={() => setIsShowPanel(false)}
    >
      <div className="flex space-x-2">
        <Avatar src={user.image} round />
        <div className="flex flex-col space-y-1">
          <span className='text-xl text-bs'>{user.nickName}</span>
          <span className='text-secondary'>{`@${user.name}`}</span>
        </div>
        <div className="flex-1"></div>
        {name !== user.name && <FollowButton name={name} userName={user.name} />}
      </div>
      <div className='whitespace-normal text-secondary'>
        {user.bio}
      </div>
      <div className="flex space-x-4 cursor-pointer">
        <span className='hover:text-primary'>
          {t('posts_count', {
            count: profileCount.posts,
          })}
        </span>
        <span className='hover:text-primary'>
          {t('following_count', {
            count: profileCount.followings,
          })}
        </span>
        <span className='hover:text-primary'>
          {t('followers_count', {
            count: profileCount.followed,
          })}
        </span>
        <div className="flex-1"></div>
      </div>
    </motion.div >
  )
}

export default UserProfileModal
