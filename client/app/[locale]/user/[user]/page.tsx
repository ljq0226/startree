'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import cn from 'clsx'
import { useQuery } from '@apollo/client'
import GetProfileData from '@api/user/GetProfileData.gql'
import Link from 'next/link'
import Avatar from '../../../../components/ui/Avatar'
import type { ProfileCount, ProfileData, UserData } from '@/types'
import Post from '@/components/post/Post'
import Following from '@/components/user/Following'
import Followers from '@/components/user/Followers'
import useI18n from '@/hooks/theme/useI18n'
import Icon from '@/components/ui/Icon'

interface Props {
  params: {
    user: string
  }
}
type tabs = 'posts' | 'followings' | 'followers'

function page({ params }: Props) {
  const t = useI18n('account')

  const [tab, setTab] = useState<tabs>('posts')
  const [profileCount, setProfileCount] = useState<ProfileCount>({
    followings: 0,
    followed: 0,
    posts: 0,
  })
  const [profileData, setProfileData] = useState<ProfileData>()
  const [userData, setUserData] = useState<UserData>()
  const { data, loading } = useQuery(
    GetProfileData,
    {
      variables: {
        name: params.user,
      },
    },
  )
  useEffect(() => {
    if (!loading) {
      setUserData(data.userData)
      setProfileCount(data.profileCount)
      setProfileData(data.profileData)
    }
  }, [data])

  const MainContent = () => {
    switch (tab) {
      case 'posts':
        return (
          <>
            {profileData?.posts.map((post) => {
              return <Post key={post.id} {...post} />
            },
            )}
          </>
        )
      case 'followings':
        return (
          <>
            {profileData?.followings.map((user) => {
              return <Following key={user.name} {...user} />
            },
            )}
          </>
        )
      case 'followers':
        return (
          <>
            {profileData?.followed.map((user) => {
              return <Followers key={user.name} {...user} />
            },
            )}
          </>
        )
    }
  }

  return (
    <>
      <Image src={'/avatar/bg-cover.jpeg'}
        width={600} height={200}
        className='h-[185px] bg-center bg-no-repeat bg-cover' alt='a' />
      <div className="flex flex-col p-4 border-y border-base ">
        <div className="flex justify-between -mt-16">
          <Avatar src={userData?.image || '/avatar/user.png'} height={24} round />
          <div className='flex flex-col'>
            <div className="flex-1"></div>
            <div className='flex flex-center'>
              <button className='flex w-8 h-8 rounded-full flex-center'>
                <Icon className=' hover:bg-[#b889f7]' icon='mingcute:more-2-line' />
              </button>
              <Link href={'/settings/profile'} className='profile-btn'>{t('edit')}</Link>
            </div>
          </div>
        </div>
        <div className='text-2xl'>{userData?.name}</div>
        <div className='text-secondary'>{`@${userData?.nickName}`}</div>
        <div className=''>{userData?.createdAt?.toString()}</div>
        <div className="flex space-x-4 cursor-pointer">
          <span className={cn(tab === 'posts' ? 'text-primary' : '')} onClick={() => setTab('posts')} >
            {t('posts_count', {
              count: profileCount.posts,
            })}
          </span>
          <span className={cn(tab === 'followings' ? 'text-primary' : '')} onClick={() => setTab('followings')}>
            {t('following_count', {
              count: profileCount.followings,
            })}
          </span>
          <span className={cn(tab === 'followers' ? 'text-primary' : '')} onClick={() => setTab('followers')}>
            {t('followers_count', {
              count: profileCount.followed,
            })}
          </span>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="flex-1">
        {MainContent()}
      </div>
    </>

  )
}

export default page
