'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Avatar from '../ui/Avatar'
import Tooltip from '../ui/Tooltip'
import LikeIcon from './icon/LikeIcon'
import BoostIcon from './icon/BoostIcon'
import CommentIcon from './icon/CommentIcon'
import StarIcon from './icon/StarIcon'
import type { PostType } from '@/types'
import useI18n from '@/hooks/theme/useI18n'
import { getTimeAgo } from '@/lib'

interface Props extends PostType {
  params?: {
    locale: string
  }
}

function Post({ content, id, createdAt, user, postCount }: PostType) {
  const router = useRouter()
  const t = useI18n('time_ago_options')
  const date = new Date(createdAt)
  const timeAgo = getTimeAgo(date)
  const [locale, setLocale] = useState('en')
  useEffect(() => {
    setLocale(document.documentElement.lang)
  }, [])

  const realTime = date.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  return (
    <>
      <div className="flex flex-col py-2 border-t cursor-pointer border-base ">
        <div
          className='flex'>
          <Avatar round src={user?.image || '/avatar/user.png'} />
          <div className="flex flex-col flex-1 px-4">
            <div className='flex items-center text-secondary'>
              <Link
                className='px-2 py-1 text-base cursor-pointer hover-animation'
                href={`/user/${user?.name}`}
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                <span className='font-bold text-bs'>{user?.name}</span>
                <span className=''>{`@${user?.name}`}</span>
              </Link>
              <span className='flex-1'></span>
              <Tooltip text={realTime} position='top'>
                <span className='text-sm hover:underline'>{t(timeAgo[0], { data: timeAgo[1] })}</span>
              </Tooltip>
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
          <StarIcon postId={id} isStar={postCount.isStar} />
        </div>
      </div>

    </>

  )
}

export default Post
