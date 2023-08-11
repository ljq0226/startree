'use client'
import Link from 'next/link'
import Avatar from '../ui/Avatar'
import type { PostIconProps } from './PostIcon'
import PostIcon from './PostIcon'
import type { PostType } from '@/types'

const PostIcons: PostIconProps[] = [
  {
    icon: 'octicon:comment-16',
    tooltip: 'reply',
    color: '#4799ec',
  },
  {
    icon: 'icon-park-outline:play-cycle',
    tooltip: 'boost',
    color: '#51b680',
  },
  {
    icon: 'icon-park-outline:like',
    tooltip: 'favorite',
    color: '#eb7d87',
  },
  {
    icon: 'ri:bookmark-line',
    tooltip: 'bookmark',
    color: '#f4ce3f',
  },
]

function Post({ content, id, createdAt, user }: PostType) {
  return (
    <Link href={`/post/${id}`} className="flex py-2 border-t cursor-pointer border-base ">
      <Avatar round src={user?.image || '/avatar/user.png'} />
      <div className="flex flex-col flex-1 px-4">
        <div className='flex items-center text-secondary'>
          <span className='font-bold text-bs'>{user?.name}</span>
          <span className=''>{`@${user?.name}`}</span>
          <span className='flex-1'></span>
          <span>10h</span>
        </div>
        <div className='flex-1'>
          {content}
        </div>
        <div className="flex justify-between py-2">
          {
            PostIcons.map((item) => {
              return <PostIcon {...item} key={item.icon} />
            })
          }
        </div>

      </div>
    </Link>
  )
}

export default Post
