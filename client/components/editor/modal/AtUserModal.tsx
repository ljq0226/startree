'use client'
import { useEffect, useRef, useState } from 'react'
import cn from 'clsx'
import type { AtUser } from '@/types'
import Avatar from '@/components/ui/Avatar'

interface Props {
  position: { x: number; y: number }
  users: AtUser[]
  handlePickUser: (user: AtUser) => void
  showAtModal: boolean
  setShowAtModal: (v: boolean) => void
}
interface UserProp extends AtUser {
  i: number
  index: number
}

function UserItem({ name, nickName, image, i, index }: UserProp) {
  return (
    <div className={cn('flex items-center ', i === index ? 'bg-active' : '')}>
      <Avatar src={image} round height={12} className='m-2' />
      <div className="flex flex-col">
        <p>{nickName}</p>
        <p className='text-sm text-secondary'>{`@${name}`}</p>
      </div>
    </div>)
}

export default function AtUserModal({ showAtModal, setShowAtModal, position, users, handlePickUser }: Props) {
  const usersRef = useRef<AtUser[]>()
  usersRef.current = users
  const [index, setIndex] = useState(0)
  const indexRef = useRef<number>()
  indexRef.current = index
  const visibleRef = useRef<boolean>()
  visibleRef.current = showAtModal
  useEffect(() => {
    const keyDownHandler = (e: any) => {
      if (visibleRef.current) {
        if (e.code === 'Escape') {
          setShowAtModal(false)
          return
        }
        if (e.code === 'ArrowDown') {
          setIndex((oldIndex) => {
            return Math.min(oldIndex + 1, (usersRef.current?.length || 0) - 1)
          })
          return
        }
        if (e.code === 'ArrowUp') {
          setIndex(oldIndex => Math.max(0, oldIndex - 1))
          return
        }
        if (e.code === 'Enter') {
          if (
            indexRef.current !== undefined
            && usersRef.current?.[indexRef.current]
          ) {
            handlePickUser(usersRef.current?.[indexRef.current])
            setIndex(-1)
          }
        }
      }
    }
    document.addEventListener('keyup', keyDownHandler)
    return () => {
      document.removeEventListener('keyup', keyDownHandler)
    }
  }, [])
  return (
    <div
      className='w-[300px] min-h-[300px] overflow-y-scroll py-2 bg-base z-[10] border border-base'
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        opacity: users.length === 0 ? 0 : 1,
      }}>
      {
        users.map((user, i) => {
          return (<UserItem index={index} i={i} {...user} key={user.name} />)
        })
      }
    </div>
  )
}
