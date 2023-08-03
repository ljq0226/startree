'use client'
import { useEffect, useRef, useState } from 'react'
import cn from 'clsx'
import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'
import Tooltip from '../ui/Tooltip'
import useI18n from '@/hooks/theme/useI18n'

function EditPost() {
  const [content, setContent] = useState('')
  const [lineCount, setLineCount] = useState(0)
  const hMin = `h-[${lineCount * 20 + 120}px]`
  const t = useI18n('tooltip')
  const textareaRef = useRef(null)
  function countLines(str: string) {
    const lines = str.split('\n').filter(line => line.trim().length > 0)
    return lines.length
  }
  const handleInput = () => {
    const { current } = textareaRef as any
    setContent(current.value)
  }
  useEffect(() => {
    setLineCount(countLines(content))
  }, [content])
  return (
    <div className="flex w-full p-2">
      <Avatar className='mx-4 max-h-12' src='/avatar/user.png' />
      <div className="flex flex-col flex-[0.9]">
        <textarea
          ref={textareaRef}
          className={cn('h-auto min-h-[200px]', 'editPost-texterea overflow-y-auto')}
          placeholder='What is your mind?'
          value={content}
          onInput={handleInput}
        />
        <div className="flex mt-4">
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
          <button className={cn('editPost-button', content ? 'bg-primary text-bs' : 'bg-btn-disabled text-btn-disabled ')}>Publish</button>
        </div>
      </div>

    </div>
  )
}

export default EditPost
