'use client'
import Link from 'next/link'
import Avatar from '../ui/Avatar'
import LikeIcon from './icon/LikeIcon'
import BoostIcon from './icon/BoostIcon'
import CommentIcon from './icon/CommentIcon'
import StarIcon from './icon/StarIcon'
import type { PostType } from '@/types'

function Post({ content, id, createdAt, user }: PostType) {
  return (
    <>
      <div className="flex flex-col py-2 border-t cursor-pointer border-base ">
        <Link href={`/post/${id}`} className='flex'>
          <Avatar round src={user?.image || '/avatar/user.png'} />
          <div className="flex flex-col flex-1 px-4">
            <div className='flex items-center text-secondary'>
              <span className='font-bold text-bs'>{user?.name}</span>
              <span className=''>{`@${user?.name}`}</span>
              <span className='flex-1'></span>
              <span>10h</span>
            </div>
            <div className='flex-1 my-2'>
              {content}
            </div>

          </div>
        </Link>
        <div className="flex justify-between py-2 mx-16">
          <CommentIcon />
          <BoostIcon />
          <LikeIcon />
          <StarIcon />
        </div>
      </div>

    </>

  )
}

export default Post
