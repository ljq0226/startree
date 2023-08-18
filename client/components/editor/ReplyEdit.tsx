'use client'
import React, { useEffect, useRef, useState } from 'react'
import FindByAt from '@api/user/FindByAt.gql'
import FindByHashTag from '@api/tag/FindByHashTag.gql'
import type { ApolloQueryResult } from '@apollo/client'
import { useQuery } from '@apollo/client'
import Avatar from '../ui/Avatar'
import AtUserModal from './modal/AtUserModal'
import Fetching from './modal/Fetching'
import HashTagModal from './modal/HashTagModal'
import ReplyAction from './ReplyAction'
import { UserStore } from '@/store'
import { getAtUser, getRangeRect, getTag, replaceAtUser, replaceHashTags, showAt, showHash } from '@/lib'
import type { AtUser, Tag } from '@/types'

interface Props {
  parentId: number
  refetch: (variables?: Partial<{
    postId: number
    name: string
  }> | undefined) => Promise<ApolloQueryResult<any>>
}

function ReplyEdit({ parentId, refetch }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const user = UserStore(s => s.user)
  const [users, setUsers] = useState<AtUser[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [userQuery, setUserQuery] = useState('')
  const [tagQuery, setTagQuery] = useState('')
  const [showAtModal, setShowAtModal] = useState(false)
  const [showTagModal, setShowTagModal] = useState(false)
  const [showFetching, setShowFetching] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const { data: userData, loading: userLoading } = useQuery(FindByAt, { variables: { query: userQuery } })
  const { data: tagData, loading: tagLoading } = useQuery(FindByHashTag, { variables: { query: tagQuery } })
  useEffect(() => {
    if (!userLoading)
      setUsers(userData.findByAt)
  }, [userData])
  useEffect(() => {
    if (!tagLoading)
      setTags(tagData.findByHashTag)
  }, [tagData])
  const handleKeyUp = () => {
    if (showAt()) {
      const position = getRangeRect()
      setPosition(position)
      const user = getAtUser()
      setShowFetching(true)
      setUserQuery(user || '')
      setTimeout(() => {
        setShowFetching(false)
        setShowAtModal(true)
      }, 800)
    }
    else {
      setShowAtModal(false)
    }
    if (showHash()) {
      const position = getRangeRect()
      setPosition(position)
      const tag = getTag()
      setShowFetching(true)
      setTagQuery(tag || '')
      setTimeout(() => {
        setShowFetching(false)
        setShowTagModal(true)
      }, 800)
    }
    else {
      setShowTagModal(false)
    }
  }
  const handleKeyDown = (e: any) => {
    if (showAtModal || showTagModal) {
      if (
        e.code === 'ArrowUp'
        || e.code === 'ArrowDown'
        || e.code === 'Enter'
      )
        e.preventDefault()
    }
  }
  const handlePickUser = (user: AtUser) => {
    replaceAtUser(user)
    setShowAtModal(false)
  }
  const handlePickTag = (tag: Tag) => {
    replaceHashTags(tag)
    setShowTagModal(false)
  }
  return (
    <div className="flex">
      <Avatar className='mx-4 max-h-12' src={user.image || '/avatar/user.png'} />
      <div className="flex flex-col flex-1 ">
        <div className="relative">
          {showFetching && <Fetching position={position} />}
          {
            showAtModal
            && <AtUserModal showAtModal={showAtModal} setShowAtModal={setShowAtModal}
              handlePickUser={handlePickUser} users={users} position={position}
            />}
          {showTagModal
            && <HashTagModal showTagModal={showTagModal} setShowTagModal={setShowTagModal}
              handlePickTag={handlePickTag} tags={tags} position={position}
            />}
          <div
            ref={editorRef}
            className="editor"
            contentEditable
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
          />
        </div>
        <ReplyAction editorTarget={editorRef.current} parentId={parentId} refetch={refetch}/>
      </div>
    </div>
  )
}

export default ReplyEdit
