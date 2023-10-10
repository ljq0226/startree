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
  async function fetchData(content: string) {
    const url = `http://hn216.api.yesapi.cn/?s=App.Common_BannerWord.Check&uuid=85804F725666469493CF419D9BBAC9D9&token=dfSXorQ2W4NIRLrMvId4QjwXh1Z9KVhcLUxjCWG72kzZkj0X8dfr5RRR7TUI0A5sbatDU&return_data=0&content=${content}&app_key=85804F725666469493CF419D9BBAC9D9&sign=85C32866C0FD0DF441E15D36408FF4C9`
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        // 在这里处理返回的数据
        return data
      }
      else {
        // 处理错误情况
        console.error('请求失败:', response.status)
      }
    }
    catch (error) {
      // 处理网络错误
      console.error('网络错误:', error)
    }
  }

  const handleSensitiveWord = (arr: string[], content: string): string => {
    let censoredContent = content

    arr.forEach((word) => {
      const regex = new RegExp(word, 'gi')
      censoredContent = censoredContent.replace(regex, '*'.repeat(word.length))
    })

    return censoredContent
  }

  const handlePublish = async () => {
    // 敏感词处理
    const content = editorTarget?.innerHTML as string
    if (content.length > 300 || content.indexOf('#') > 0) {
      const { data } = await addTodo({
        variables: {
          createPostInput: {
            content,
            userName: user.name,
          },
        },
      })

      if (editorTarget)
        editorTarget.innerHTML = ''
      useAlert('success', '发布成功')
      setNewPost(data.createPost)
      return
    }
    const res: any = await fetchData(content)
    if (res?.data?.err_code === 0) {
      const { data } = await addTodo({
        variables: {
          createPostInput: {
            content: editorTarget?.innerHTML,
            userName: user.name,
          },
        },
      })

      if (editorTarget)
        editorTarget.innerHTML = ''
      useAlert('success', '发布成功')
      setNewPost(data.createPost)
    }
    else if (res?.data?.err_code === 1) {
      const { data } = await addTodo({
        variables: {
          createPostInput: {
            content: handleSensitiveWord(res?.data?.sensitiveWord, editorTarget?.innerHTML as string),
            userName: user.name,
          },
        },
      })

      if (editorTarget)
        editorTarget.innerHTML = ''
      useAlert('warning', '发布内容存在敏感词!!!')
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
        {/* <Tooltip text={t('add_media')} position='top'>
          <button className='editPost-icon' >
            <Icon icon='ph:image' />
          </button>
        </Tooltip> */}
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
