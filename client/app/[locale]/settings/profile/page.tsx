'use client'
import React from 'react'
import Image from 'next/image'
import Avatar from '@/components/ui/Avatar'
import useI18n from '@/hooks/theme/useI18n'

function page() {
  const t = useI18n('settings.profile.appearance')
  const userData = {
    name: 'asd',
    nickName: 'asd',

  }

  return (
    <div className='settings-container'>
      <Image src={'/avatar/bg-cover.jpeg'}
        width={600} height={200}
        className='h-[185px] bg-center bg-no-repeat bg-cover' alt='a' />
      <div className="flex flex-col p-4 space-y-2 border-y border-base">
        <div className="flex justify-between -mt-16">
          <Avatar src={'/avatar/user.png'} height={24} round />
        </div>
        <div className='text-2xl'>{userData?.name}</div>
        <div className='text-secondary'>{`@${userData?.nickName}`}</div>
        <div className=''>{t('display_name')}</div>
        <input className='profile-input' type="text" />
        <div className=''>{t('bio')}</div>
        <textarea className='w-full profile-input' />
        <div className=''>{t('profile_metadata')}</div>
        <div>
          <span className='mr-5'>Github:</span><input className='profile-input' type="text" />
        </div>
        <div>
          <span className='mr-2'>WebSite:</span><input className='profile-input' type="text" />
        </div>
      </div>

    </div>
  )
}

export default page
