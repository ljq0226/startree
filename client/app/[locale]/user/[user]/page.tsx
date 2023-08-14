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
import { UserStore } from '@/store'
import FollowButton from '@/components/user/FollowButton'
import Tooltip from '@/components/ui/Tooltip'

interface Props {
  params: {
    user: string
    locale: string
  }
}
type tabs = 'posts' | 'followings' | 'followers'

function page({ params }: Props) {
  const t = useI18n('account')
  const { name } = UserStore(s => s.user)
  const [tab, setTab] = useState<tabs>('posts')
  const [profileCount, setProfileCount] = useState<ProfileCount>({
    followings: 0,
    followed: 0,
    posts: 0,
  })
  const [profileData, setProfileData] = useState<ProfileData>()
  const [userData, setUserData] = useState<UserData>()
  const date = new Date(userData?.createdAt as Date)
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
      setProfileData(data.getProfileData)
    }
  }, [data])

  const RenderBtn = () => {
    return name === params.user
      ? <Link href={'/settings/profile'} className='profile-btn'>{t('edit')}</Link>
      : <FollowButton name={name} userName={params.user} />
  }

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
                <Icon icon='mingcute:more-2-line' />
              </button>
              {RenderBtn()}
            </div>
          </div>
        </div>
        <div className='my-2 text-2xl'>{userData?.name}</div>
        <div className='text-base text-secondary'>{`@${userData?.nickName}`}</div>
        <div className='my-2'>{userData?.profile.bio || 'Nothing is impossible!'}</div>
        <div className='flex items-center my-2 space-x-2 text-base text-secondary'>
          <div className='flex flex-center'>
            <Icon icon='dashicons:admin-links' height={16} className='mr-2' />
            <a href={userData?.profile.website}
              className='text-blue-600 hover:underline'>
              {userData?.profile.website || ''}
            </a>
          </div>
          <div className='flex flex-center'>
            <Icon icon='ri:github-line' height={18} className='mr-2' />
            <a href={`https://github.com/${userData?.profile.github}`}
              className='text-blue-600 hover:underline'>
              {userData?.profile.github || ''}
            </a>
          </div>
          <div className='flex flex-center'>
            <Tooltip text={t('joined')}>
              <Icon icon='fluent-mdl2:join-online-meeting' className='mr-2' height={16} />
            </Tooltip>
            <span>
              {date.toLocaleDateString(params.locale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

        </div>
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
