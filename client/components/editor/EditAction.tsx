import React, { useState } from 'react'
import cn from 'clsx'
import { useMutation } from '@apollo/client'
import CreatePost from '@api/post/CreatePost.gql'
import EmojiPanel from '../modal/EmojiPanel'
import Icon from '../ui/Icon'
import Tooltip from '../ui/Tooltip'
import useI18n from '@/hooks/theme/useI18n'
import { AlertStore, PostStore, UserStore } from '@/store'

interface Props {
  editorTarget: HTMLDivElement | null
}

function EditAction({ editorTarget }: Props) {
  const t = useI18n('tooltip')
  const t2 = useI18n('action')
  const user = UserStore(s => s.user)
  const useAlert = AlertStore(s => s.useAlert)
  const setNewPost = PostStore(s => s.setNewPost)
  const [showEmoji, setShowEmoji] = useState(false)
  const [addTodo, { loading }] = useMutation(CreatePost)
  const handlePublish = async () => {
    const { data } = await addTodo({
      variables: {
        createPostInput: {
          content: editorTarget?.innerHTML,
          userName: user.name,
        },
      },
    })
    if (!loading) {
      if (editorTarget)
        editorTarget.innerHTML = ''
      useAlert('success', 'Post Successfully!')
      setNewPost(data.createPost)
    }
  }
  return (
    <div className={cn('flex mt-4')}>
      <div className="flex space-x-2">
        <Tooltip className='relative' text={t('add_emojis')} position='top'>
          {
            showEmoji
            && <EmojiPanel editorTarget={editorTarget} setShowEmoji={setShowEmoji} />
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
      </div>
      <div className="flex-1"></div>
      <button
        className={cn('editPost-button', true ? 'bg-primary text-bs' : 'bg-btn-disabled text-btn-disabled ')}
        onClick={() => handlePublish()}
      >
        {t2('publish')}
      </button>
    </div>
  )
}

export default EditAction
