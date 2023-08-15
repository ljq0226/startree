'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import FindByAt from '@api/user/FindByAt.gql'
import AtDialog from '../post/AtDialog'
import type { AtUser } from '@/types'
import { getAtUser, getRangeRect, replaceAtUser, showAt } from '@/lib'

interface Props {
  editorRef: React.LegacyRef<HTMLDivElement> | undefined
  setActive: (v: boolean) => void
}

function Editor({ setActive, editorRef }: Props) {
  const [atUsers, setAtUsers] = useState<AtUser[]>([])
  const [queryString, setQueryString] = useState('@')
  const [tags, setTags] = useState<string[]>([])
  const { loading, data } = useQuery(FindByAt, {
    variables: {
      query: queryString,
    },
  })
  useEffect(() => {
    const getData = async () => {
      setAtUsers(data.findByAt)
    }
    !loading && getData()
  }, [queryString])

  useEffect(() => {
  }, [tags])

  const [showDialog, setShowDialog] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const handkeKeyUp = (e: any) => {
    if (showAt()) {
      const position = getRangeRect()
      setPosition(position)
      const query = getAtUser()
      setQueryString(query || '')
      setShowDialog(true)
    }
  }

  const handleKeyDown = (e: any) => {
    if (showDialog) {
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
    setShowDialog(false)
  }
  const handleHide = () => {
    setShowDialog(false)
  }

  const handleShow = () => {
    setShowDialog(true)
  }
  return (
    <div className="relative min-h-[120px] max-h-[400px] "
      onFocus={() => {
        setActive(true)
      }}
      onBlur={() => setActive(false)}
    >
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onKeyUp={handkeKeyUp}
        onKeyDown={handleKeyDown}
      />
      <AtDialog
        onPickUser={handlePickUser}
        users={atUsers}
        visible={showDialog}
        position={position}
        queryString={queryString}
        setQueryString={setQueryString}
        onHide={handleHide}
        onShow={handleShow}
      />
    </div>
  )
}

export default Editor
