'use client'
import React, { useRef, useState } from 'react'
import cn from 'clsx'
import { useMutation } from '@apollo/client'
import CreatePost from '@api/post/CreatePost.gql'
import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'
import Tooltip from '../ui/Tooltip'
import EmojiPanel from '../modal/EmojiPanel'
import Editor from './Editor'
import useI18n from '@/hooks/theme/useI18n'
import { AlertStore, UserStore } from '@/store'

function EditPost() {
  const [active, setActive] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const useAlert = AlertStore(s => s.useAlert)
  const t = useI18n('tooltip')
  const user = UserStore(s => s.user)
  const [addTodo, { loading, error }] = useMutation(CreatePost)

  const handlePublish = async () => {
    const target = editorRef.current
    await addTodo({
      variables: {
        createPostInput: {
          content: target?.innerHTML,
          userName: user.name,
        },
      },
    })
    !loading && useAlert('success', 'Post Successfully!')
  }

  return (
    <div className="flex w-full p-2">
      <Avatar className='mx-4 max-h-12' src={user.image || '/avatar/user.png'} />
      <div className="flex flex-col flex-1 ">
        <Editor editorRef={editorRef} setActive={setActive} />
        <div className={cn('flex mt-4')}>
          <div className="flex space-x-2">
            <Tooltip className='relative' text={t('add_emojis')} position='top'>
              {
                showEmoji
                && <EmojiPanel editorTarget={editorRef.current} setShowEmoji={setShowEmoji} />
              }
              <button
                className='editPost-icon'
                onClick={() => {
                  setShowEmoji(true)
                }}>
                <Icon icon='mingcute:emoji-line' />
              </button>
            </Tooltip>
            <Tooltip text={t('add_media')} position='top'>
              <button className='editPost-icon' >
                <Icon icon='ph:image' />
              </button>
            </Tooltip>
            <Tooltip text={t('add_tag')} position='top'>
              <button className='editPost-icon' >
                <Icon icon='lucide:hash' />
              </button>
            </Tooltip>
            <Tooltip text={t('emoji')} position='top'>
              <button className='editPost-icon' >
                <Icon icon='mingcute:emoji-line' />
              </button>
            </Tooltip>
          </div>
          <div className="flex-1"></div>
          <button
            className={cn('editPost-button', true ? 'bg-primary text-bs' : 'bg-btn-disabled text-btn-disabled ')}
            onClick={() => handlePublish()}
          >
            Publish
          </button>
        </div>

      </div>

    </div>
  )
}

export default EditPost
