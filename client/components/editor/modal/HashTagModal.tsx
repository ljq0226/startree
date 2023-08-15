'use client'
import { useEffect, useRef, useState } from 'react'
import cn from 'clsx'
import { Icon } from '@iconify/react/dist/iconify.js'
import type { Tag } from '@/types'

interface Props {
  position: { x: number; y: number }
  tags: Tag[]
  handlePickTag: (tag: Tag) => void
  showTagModal: boolean
  setShowTagModal: (v: boolean) => void
}
interface TagProp {
  name: string
  i: number
  index: number
}

function TagItem({ name, i, index }: TagProp) {
  return (
    <div className={cn('flex items-center ', i === index ? 'bg-active' : '')}>
      <Icon icon={'eva:hash-fill'} className='m-2' />
      <div className="flex flex-col">
        <p className='text-sm text-secondary'>{name}</p>
      </div>
    </div>)
}

export default function HashTagModal({ showTagModal, setShowTagModal, position, tags, handlePickTag }: Props) {
  const tagsRef = useRef<Tag[]>()
  tagsRef.current = tags
  const [index, setIndex] = useState(0)
  const indexRef = useRef<number>()
  indexRef.current = index
  const visibleRef = useRef<boolean>()
  visibleRef.current = showTagModal
  useEffect(() => {
    const keyDownHandler = (e: any) => {
      if (visibleRef.current) {
        if (e.code === 'Escape') {
          setShowTagModal(false)
          return
        }
        if (e.code === 'ArrowDown') {
          setIndex((oldIndex) => {
            return Math.min(oldIndex + 1, (tagsRef.current?.length || 0) - 1)
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
            && tagsRef.current?.[indexRef.current]
          ) {
            handlePickTag(tagsRef.current?.[indexRef.current])
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
        opacity: tags.length === 0 ? 0 : 1,
      }}>
      {
        tags.map((tag, i) => {
          return (<TagItem index={index} i={i} {...tag} key={tag.name} />)
        })
      }
    </div>
  )
}
