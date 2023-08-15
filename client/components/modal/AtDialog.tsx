import { useEffect, useState } from 'react'
import AtUserInfo from '../post/AtUserInfo'
import type { AtUser } from '@/types'

interface User { name: string; id: string }

interface Props {
  users: AtUser[]
  visible: boolean
  position: { x: number; y: number }
  queryString?: string
  setQueryString: (v: string) => void
  onPickUser: (user: AtUser) => void
  onHide: () => void
  onShow: () => void
}

function AtDialog({ users, visible, position, onPickUser, queryString, onHide, onShow }: Props) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (visible) {
        if (e.code === 'Escape') {
          onHide()
          return
        }
        if (e.code === 'ArrowDown') {
          setIndex((oldIndex) => {
            return Math.min(oldIndex + 1, (users.length || 0) - 1)
          })
          return
        }
        if (e.code === 'ArrowUp') {
          setIndex(oldIndex => Math.max(0, oldIndex - 1))
          return
        }
        if (e.code === 'Enter') {
          if (users[index]) {
            onPickUser(users[index])
            setIndex(0)
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
    <>
      {visible
        ? <div
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
          }}
          className="w-[250px] h-[200px] overflow-y-scroll max-h-[300px] z-10 pt-2 text-center bg-base  border border-base  rounded-md"
        >
          {users.length ? '' : '无搜索结果'}
          {users.map((user, i) => {
            return (
              <AtUserInfo
                key={user.name}
                user={user}
                isActive={i === index}
              />
            )
          })}
        </div>
        : null}
    </>
  )
}

export default AtDialog
