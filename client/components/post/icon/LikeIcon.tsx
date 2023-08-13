'use client'
import React, { useState } from 'react'
import cn from 'clsx'
import CreateLike from '@api/like/CreateLike.gql'
import DeleteLike from '@api/like/DeleteLike.gql'
import { useMutation } from '@apollo/client'
import useI18n from '@/hooks/theme/useI18n'
import Tooltip from '@/components/ui/Tooltip'
import Icon from '@/components/ui/Icon'
import { UserStore } from '@/store'

interface Props {
  postId: number
  count: number
  isLike: boolean
}

export default function LikeIcon({ postId, count, isLike }: Props) {
  const t = useI18n('action')
  const { name } = UserStore(s => s.user)
  const [createLike] = useMutation(CreateLike)
  const [deleteLike] = useMutation(DeleteLike)
  const [state, setState] = useState({
    count,
    isLike,
  })
  const handelDelete = async () => {
    await deleteLike({
      variables: {
        deleteLikeInput: {
          postId,
          userName: name,
        },
      },
    })
    setState({
      count: Math.max(state.count - 1, 0),
      isLike: false,
    })
  }
  const handelCreate = async () => {
    await createLike({
      variables: {
        createLikeInput: {
          postId,
          userName: name,
        },
      },
    })
    setState({
      count: state.count + 1,
      isLike: true,
    })
  }
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    state.isLike ? handelDelete() : handelCreate()
  }
  const RenderIcon = () => {
    return state.isLike
      ? (<Icon
        color='#eb7d87'
        icon={'icon-park-solid:like'}
        height={18}
      />)
      : (<Icon
        icon={'icon-park-outline:like'}
        height={18}
      />)
  }
  const RenderCount = () => {
    return state.count === 0
      ? (
        <>
        </>)
      : (<span className={state.isLike ? 'text-[#eb7d87]' : ''}>{state.count}</span>)
  }
  return (
    <div
      className={'relative cursor-pointer hover:text-[#eb7d87]'}
      onClick={handleClick}
    >
      <Tooltip text={t('favorite')}>
        <button className={cn('post-icon')} >
          {RenderIcon()}
        </button>
      </Tooltip>
      <div className='absolute top-1 left-8'>
        {RenderCount()}
      </div>
    </div>
  )
}
