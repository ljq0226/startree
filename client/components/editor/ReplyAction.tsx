import React, { useState } from 'react'
import cn from 'clsx'
import type { ApolloQueryResult } from '@apollo/client'
import { useMutation } from '@apollo/client'
import CreateReply from '@api/reply/CreateReply.gql'
import EmojiPanel from '../modal/EmojiPanel'
import Icon from '../ui/Icon'
import Tooltip from '../ui/Tooltip'
import useI18n from '@/hooks/theme/useI18n'
import { AlertStore, UserStore } from '@/store'

interface Props {
  editorTarget: HTMLDivElement | null
  parentId: number
  refetch: (variables?: Partial<{
    postId: number
    name: string
  }> | undefined) => Promise<ApolloQueryResult<any>>
}

function ReplyAction({ editorTarget, parentId, refetch }: Props) {
  const t = useI18n('tooltip')
  const t2 = useI18n('action')
  const user = UserStore(s => s.user)
  const useAlert = AlertStore(s => s.useAlert)
  const [showEmoji, setShowEmoji] = useState(false)
  const [addReply, { loading }] = useMutation(CreateReply)
  const handlePublish = async () => {
    await addReply({
      variables: {
        createReplyInput: {
          content: editorTarget?.innerHTML,
          userName: user.name,
          parentId,
        },
      },
    })
    if (!loading) {
      if (editorTarget)
        editorTarget.innerHTML = ''
      refetch({ postId: parentId, name: user.name })
      useAlert('success', 'Reply Successfully!')
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
        {t2('publish')}
      </button>
    </div>
  )
}

export default ReplyAction
