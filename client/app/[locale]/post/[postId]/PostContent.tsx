'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { PostType } from '@/types'
import UserProfileModal from '@/components/modal/UserProfileModal'
import CommentIcon from '@/components/post/icon/CommentIcon'
import ForwardIcon from '@/components/post/icon/ForwardIcon'
import LikeIcon from '@/components/post/icon/LikeIcon'
import StarIcon from '@/components/post/icon/StarIcon'
import Avatar from '@/components/ui/Avatar'
import Icon from '@/components/ui/Icon'

function PostContent({ content, id, createdAt, user, postCount, profileCount }: PostType) {
  const router = useRouter()
  const date = new Date(createdAt)
  const [isShowPanel, setIsShowPanel] = useState(false)
  const [locale, setLocale] = useState('en')
  useEffect(() => {
    setLocale(document.documentElement.lang)
  }, [])

  const realTime = date.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  return (
    <>
      <div className="flex flex-col py-2 border-t cursor-pointer border-base ">
        <div className='flex'>
          <Avatar round src={user?.image || '/avatar/user.png'} />
          <div className="flex flex-col flex-1 px-4">
            <div className='flex items-center text-secondary'>
              <Link
                className='relative flex flex-col px-2 py-1 text-base cursor-pointer hover-animation'
                href={`/user/${user?.name}`}
                onClick={(event) => {
                  event.stopPropagation()
                }}
                onMouseEnter={() =>
                  setIsShowPanel(true)
                }
                onMouseLeave={(e: React.MouseEvent) => {
                  const clientOffset = e.currentTarget.getBoundingClientRect()
                  if (e.clientX > clientOffset.right - 10 || e.clientX < clientOffset.left + 10 || e.clientY < clientOffset.top)
                    setIsShowPanel(false)
                }}
              >
                {isShowPanel && <UserProfileModal setIsShowPanel={setIsShowPanel} profileCount={profileCount} user={user} />}
                <span className='font-bold text-bs'>{user?.name}</span>
                <span className=''>{`@${user?.name}`}</span>
              </Link>
              <span className='flex-1'></span>
              <Icon icon='ri:more-line' />
            </div>
          </div>
        </div>
        <div
          className='flex-1 px-2 my-2'
          onClick={(e) => {
            router.replace(`/post/${id}`)
          }}
        >
          {content}
        </div>
        <div className='flex items-center my-4 text-sm text-secondary hover:underline'>
          <span>{realTime}</span>
          <Icon icon='pajamas:earth' height={12} className='ml-2'></Icon>
        </div>
        <div
          className="flex justify-between py-2 border-y border-base"
          onClick={(e) => {
            router.replace(`/post/${id}`)
          }}
        >
          <CommentIcon count={postCount.reply} />
          <ForwardIcon postId={id} count={postCount.forward} isForward={postCount.isForward} />
          <LikeIcon postId={id} count={postCount.like} isLike={postCount.isLike} />
          <StarIcon postId={id} isStar={postCount.isStar} />
        </div>
      </div>

    </>

  )
}

export default PostContent
