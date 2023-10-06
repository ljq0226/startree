import React from 'react'
import DeletePost from '@api/post/DeletePost.gql'
import { useMutation } from '@apollo/client'
import Icon from '@/components/ui/Icon'
import useI18n from '@/hooks/theme/useI18n'
import { PostStore } from '@/store'

interface Props {
  isSelf: boolean
  postId: number
}

interface Item {
  icon: string
  actionName: string
}

const actionItems: Item[] = [
  {
    icon: 'mdi:favourite-border',
    actionName: 'show_favorited_and_forwarded_by',
  },
  // {
  //   icon: 'tabler:link',
  //   actionName: 'copy_link_to_post',
  // },
  // {
  //   icon: 'ic:baseline-link',
  //   actionName: 'copy_original_link_to_post',
  // },
  // {
  //   icon: 'oi:ban',
  //   actionName: 'mute_conversation',
  // },
  // {
  //   icon: 'fluent:open-20-filled',
  //   actionName: 'open_in_original_site',
  // },
]

function PostEditModal({ isSelf, postId }: Props) {
  const t = useI18n('menu')
  const [removePost] = useMutation(DeletePost)
  const setDeletePostId = PostStore(s => s.setDeletePostId)
  const handleDelete = async () => {
    const { data } = await removePost({ variables: { id: postId } })
    if (data.deletePost)
      setDeletePostId(postId)
  }
  return (
    <div className='absolute z-10 flex w-[300px] max-w-[300px] flex-col p-3 space-y-2 border bg-base top-8 -left-6 border-base'>
      {
        actionItems.map((item) => {
          return (
            <div key={item.icon} className='flex items-center justify-start p-2 space-x-2 hover-animation'>
              <Icon icon={item.icon} height={16} />
              <span className='text-base'>{t(item.actionName)}</span>
            </div>
          )
        })
      }
      {
        isSelf && (
          <div
            className='flex items-center justify-start p-2 space-x-2 text-error hover-animation'
            onClick={handleDelete}
          >
            <Icon icon='ph:trash-light' height={16} />
            <span className='text-base'>{t('delete')}</span>
          </div>
        )
      }
    </div>

  )
}

export default PostEditModal
