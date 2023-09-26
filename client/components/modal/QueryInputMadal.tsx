'use client'
import cn from 'clsx'
import Link from 'next/link'
import Icon from '../ui/Icon'
import type { QueryInputType } from '@/types'
import Avatar from '@/components/ui/Avatar'

function UserItem({ name, nickName, image }: { name: string; nickName: string; image: string }) {
  return (
    <Link href={`/user/${name}`}>
      <div className={cn('flex items-center hover-animation')}>
        <Avatar src={image} round height={12} className='m-2' />
        <div className="flex flex-col">
          <p>{nickName}</p>
          <p className='text-sm text-secondary'>{`@${name}`}</p>
        </div>
      </div>
    </Link>
  )
}

function TagItem({ name }: { name: string }) {
  return (
    <Link href={`/tag/${name}`}>
      <div className={cn('flex items-center hover-animation')}>
        <Icon icon={'eva:hash-fill'} className='m-2' />
        <div className="flex flex-col">
          <p className='text-sm text-secondary'>{name}</p>
        </div>
      </div>
    </Link>
  )
}

export default function QueryInputModal({ users, tags }: QueryInputType) {
  return (
    <div
      className='absolute top-10 -left-2 w-[300px] min-h-[300px] overflow-y-scroll py-2 bg-base z-[10] border border-base'
    >
      {
        tags?.map((tag) => {
          return (<TagItem key={tag.name} {...tag} />)
        })
      }
      {
        users?.map((user, i) => {
          return (<UserItem key={user.name} {...user} />)
        })
      }
    </div>
  )
}
