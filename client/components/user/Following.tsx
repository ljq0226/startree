import React from 'react'
import Link from 'next/link'
import Avatar from '../ui/Avatar'
import type { Follow } from '@/types'

function Following({ name, nickName, image }: Follow) {
  return (
    <div className="flex py-2 border-b border-base hover-animation">
      <Link className='flex flex-[0.5] px-6 cursor-pointer' href={`/user/${name}`}>
        <Avatar round src={image || '/avatar/user.png'} />
        <div className="flex flex-col flex-1 px-4">
          <div className='flex flex-col text-secondary'>
            <span className='font-bold text-bs'>{nickName}</span>
            <span className=''>{`@${name}`}</span>
          </div>
        </div>
      </Link>
      <div className="flex-[0.5]"></div>
      <div className='flex mr-4 flex-center'>
        <button className='px-4 py-1 border rounded-xl hover:border-primary hover:text-primary'>Following</button>
      </div>
    </div>
  )
}

export default Following
