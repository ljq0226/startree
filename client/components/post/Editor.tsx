'use client'
import React, { useState } from 'react'
import AtDialog from '../modal/AtDialog'
import { getAtUser, getRangeRect, replaceAtUser, showAt } from '@/lib'

interface Props {
  divRef: React.LegacyRef<HTMLDivElement> | undefined
  setActive: (v: boolean) => void
}

interface User { name: string; id: string }

function Editor({ setActive, divRef }: Props) {
  const [queryString, setQueryString] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const handkeKeyUp = (e: any) => {
    if (showAt()) {
      const position = getRangeRect()
      setPosition(position)
      const user = getAtUser()
      setQueryString(user || '')
      setShowDialog(true)
    }
    else {
      setShowDialog(false)
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

  const handlePickUser = (user: User) => {
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
        ref={divRef}
        className="editor"
        contentEditable
        onKeyUp={handkeKeyUp}
        onKeyDown={handleKeyDown}
      />
      <AtDialog
        visible={showDialog}
        position={position}
        queryString={queryString}
        onPickUser={handlePickUser}
        onHide={handleHide}
        onShow={handleShow}
      />
    </div>
  )
}

export default Editor
