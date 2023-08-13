'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Avatar from '../ui/Avatar'
import LikeIcon from './icon/LikeIcon'
import BoostIcon from './icon/BoostIcon'
import CommentIcon from './icon/CommentIcon'
import StarIcon from './icon/StarIcon'
import type { PostType } from '@/types'

function Post({ content, id, createdAt, user, postCount }: PostType) {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col py-2 border-t cursor-pointer border-base ">
        <div
          className='flex'>
          <Avatar round src={user?.image || '/avatar/user.png'} />
          <div className="flex flex-col flex-1 px-4">
            <div className='flex items-center text-secondary'>
              <Link
                className='px-2 py-1 cursor-pointer hover-animation'
                href={`/user/${user?.name}`}
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                <span className='font-bold text-bs'>{user?.name}</span>
                <span className=''>{`@${user?.name}`}</span>

              </Link>
              <span className='flex-1'></span>
              <span>10h</span>
            </div>
            <div
              className='flex-1 px-2 my-2'
              onClick={(e) => {
                router.replace(`/post/${id}`)
              }}
            >
              {content}
            </div>

          </div>
        </div>
        <div
          className="flex justify-between py-2 mx-16"
          onClick={(e) => {
            router.replace(`/post/${id}`)
          }}
        >
          <CommentIcon />
          <BoostIcon />
          <LikeIcon postId={id} count={postCount.like} isLike={postCount.isLike} />
          <StarIcon />
        </div>
      </div>

    </>

  )
}

export default Post
