'use client'
import Image from 'next/image'
import { useState } from 'react'
import cn from 'clsx'
import Avatar from '../../../../components/ui/Avatar'

interface Props {
  params: {
    user: string
  }
}
type tabs = 'posts' | 'followings' | 'followers'

function page({ params }: Props) {
  const [tab, setTab] = useState<tabs>('posts')

  const MainContent = () => {
    switch (tab) {
      case 'posts':
        return (<>posts</>)
      case 'followings':
        return (<>followings</>)
      case 'followers':
        return (<>followers</>)
    }
  }

  return (
    <>
      <Image src={'/avatar/bg-cover.jpeg'}
        width={600} height={200}
        className='h-[185px] bg-center bg-no-repeat bg-cover' alt='a' />
      <div className="flex flex-col p-4 border-y border-base ">
        <div className="flex justify-between -mt-16">
          <Avatar src='/avatar/user.png' height={24} round />
          <div>
            <button>Edit profile</button>
          </div>
        </div>
        <div className='text-2xl'>大帅</div>
        <div className='text-secondary'>大帅</div>
        <div className=''>加入时间</div>
        <div className="flex space-x-4 cursor-pointer">
          <span className={cn(tab === 'posts' ? 'text-primary' : '')} onClick={() => setTab('posts')} >Posts</span>
          <span className={cn(tab === 'followings' ? 'text-primary' : '')} onClick={() => setTab('followings')}>Followings</span>
          <span className={cn(tab === 'followers' ? 'text-primary' : '')} onClick={() => setTab('followers')}>Followers</span>
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
