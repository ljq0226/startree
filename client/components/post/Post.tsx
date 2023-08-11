'use client'
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

function Post({ content, createdAt, User }: PostType) {
  return (
    <div className="flex py-2 border-t border-base ">
      <Avatar round src={User?.image || '/avatar/user.png'} />
      <div className="flex flex-col flex-1 px-4">
        <div className='flex items-center text-secondary'>
          <span className='font-bold text-bs'>{User?.name}</span>
          <span className=''>{`@${User?.name}`}</span>
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
    </div>
  )
}

export default Post
