'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useMutation } from '@apollo/client'
import UpdateProfile from '@api/user/UpdateProfile.gql'
import Avatar from '@/components/ui/Avatar'
import useI18n from '@/hooks/theme/useI18n'
import { AlertStore, UserStore } from '@/store'
import type { UserAuth } from '@/types'
import { USERINFO } from '@/constants'

const page = React.memo(() => {
  const t = useI18n('settings.profile.appearance')
  const t2 = useI18n('action')
  const user = UserStore(s => s.user)
  const setUser = UserStore(s => s.setUser)
  const [data, setData] = useState<UserAuth>({
    ...user,
  })
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem(USERINFO) as string))
  }, [])
  useEffect(() => {
    if (user.name)
      setData(user)
  }, [user])

  const [updateUserProfile] = useMutation(UpdateProfile)
  const useAlert = AlertStore(s => s.useAlert)

  const handleSave = async () => {
    const profile = data.profile
    const res = await updateUserProfile({
      variables: {
        updateUserInput: {
          name: data.name,
          email: data.email,
          image: data.image,
          nickName: data.nickName,
          profile: {
            id: profile.id,
            bio: profile.bio,
            github: profile.github,
            website: profile.website,
          },
        },
      },
    })
    if (res.data) {
      localStorage.setItem(USERINFO, JSON.stringify({
        ...res.data.updateUserProfile,
      }))
      setUser({
        ...res.data.updateUserProfile,
      })

      useAlert('success', '保存成功')
    }
    else {
      useAlert('warning', '保存失败')
    }
  }

  const handleReset = () => {
    setData({ ...JSON.parse(localStorage.getItem(USERINFO) as string) })
  }

  return (
    <div className='settings-container'>
      <Image src={'/avatar/bg-cover.jpeg'}
        width={600} height={200}
        className='h-[185px] bg-center bg-no-repeat bg-cover' alt='a' />
      <div className="flex flex-col p-4 space-y-2 border-t border-base">
        <div className="flex justify-between -mt-16">
          <Avatar src={user.image || '/avatar/user.png'} height={24} round />
        </div>
        <div className='text-2xl'>{user.nickName}</div>
        <div className='text-secondary'>{`@${user.name}`}</div>
        <div className=''>{t('display_name')}</div>
        <input
          className='profile-input'
          type="text"
          placeholder={user.nickName}
          onChange={(e) => {
            setData({ ...data, nickName: e.target.value })
          }}
        />
        <div className=''>{t('bio')}</div>
        <textarea
          className='w-full profile-input'
          placeholder={user.profile?.bio}
          value={data.profile?.bio}
          onChange={(e) => {
            const profile = data.profile
            profile.bio = e.target.value
            setData({ ...data, profile })
          }}
        />
        <div className=''>{t('profile_metadata')}</div>
        <div>
          <span className='mr-5'>Github:</span>
          <input
            className='profile-input'
            type="text"
            placeholder={user.profile?.github}
            value={data.profile.github}
            onChange={(e) => {
              const profile = data.profile
              profile.github = e.target.value
              setData({ ...data, profile })
            }}
          />

        </div>
        <div>
          <span className='mr-2'>WebSite:</span>
          <input
            className='profile-input'
            type="text"
            placeholder={user.profile?.website}
            value={data.profile.website}
            onChange={(e) => {
              const profile = data.profile
              profile.website = e.target.value
              setData({ ...data, profile })
            }}
          />
        </div>
        <div className='flex justify-end py-4 space-x-4 cursor-pointer'>
          <div
            className="profile-action text-error hover:bg-[#cd7c70]/20"
            onClick={() => handleReset()}
          >
            <Icon icon={'tabler:eraser'} />
            <span>
              {t2('reset')}
            </span>
          </div>
          <div
            className="profile-action text-info hover:bg-[#76baf1]/20"
            onClick={() => handleSave()}
          >
            <Icon icon={'basil:save-outline'} />
            <span>
              {t2('save')}
            </span>
          </div>
        </div>

      </div>

    </div>
  )
},
)
export default page
