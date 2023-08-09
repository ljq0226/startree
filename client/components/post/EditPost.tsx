'use client'
import React, { useState } from 'react'
import cn from 'clsx'
import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'
import Tooltip from '../ui/Tooltip'
import Editor from './Editor'
import useI18n from '@/hooks/theme/useI18n'
import UserStore from '@/store/user'
import { hasTextContent } from '@/lib'

function EditPost() {
  const [active, setActive] = useState(false)
  const [html, setHtml] = useState('')
  const t = useI18n('tooltip')
  const user = UserStore(s => s.user)

  const handlePublish = () => {

  }

  return (
    <div className="flex w-full p-2">
      <Avatar className='mx-4 max-h-12' src={user.image || '/avatar/user.png'} />
      <div className="flex flex-col flex-1 ">
        <Editor html={html} setHtml={setHtml} setActive={setActive} />
        <div className={cn('flex mt-4')}>
          <div className="flex space-x-2">
            <Tooltip text={t('add_emojis')} position='top'>
              <button className='editPost-icon' >
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
            className={cn('editPost-button', hasTextContent(html) ? 'bg-primary text-bs' : 'bg-btn-disabled text-btn-disabled ')}
            onClick={() => handlePublish}
          >
            Publish
          </button>
        </div>

      </div>

    </div>
  )
}

export default EditPost
