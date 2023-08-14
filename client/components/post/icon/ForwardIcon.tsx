'use client'
import React, { useEffect, useState } from 'react'
import cn from 'clsx'
import CreateForward from '@api/forward/CreateForward.gql'
import Deleteforward from '@api/forward/Deleteforward.gql'
import { useMutation } from '@apollo/client'
import useI18n from '@/hooks/theme/useI18n'
import Tooltip from '@/components/ui/Tooltip'
import Icon from '@/components/ui/Icon'
import { UserStore } from '@/store'

interface Props {
  postId: number
  count: number
  isForward: boolean
}

export default function ForwardIcon({ postId, count, isForward }: Props) {
  const t = useI18n('action')
  const { name } = UserStore(s => s.user)
  const [createForward] = useMutation(CreateForward)
  const [deleteForward] = useMutation(Deleteforward)
  const [state, setState] = useState({
    count,
    isForward,
  })

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      isForward,
    }))
  }, [isForward])
  const handelDelete = async () => {
    await deleteForward({
      variables: {
        deleteForwardInput: {
          postId,
          userName: name,
        },
      },
    })
    setState({
      count: Math.max(state.count - 1, 0),
      isForward: false,
    })
  }
  const handelCreate = async () => {
    await createForward({
      variables: {
        createForwardInput: {
          postId,
          userName: name,
        },
      },
    })
    setState({
      count: state.count + 1,
      isForward: true,
    })
  }
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    state.isForward ? handelDelete() : handelCreate()
  }
  const RenderIcon = () => {
    return state.isForward
      ? (<Icon
        color='#51b680'
        icon={'basil:forward-solid'}
        height={26}
      />)
      : (<Icon
        icon={'basil:forward-outline'}
        height={26}
      />)
  }
  const RenderCount = () => {
    return state.count === 0
      ? (
        <>
        </>)
      : (<span className={state.isForward ? 'text-[#51b680]' : ''}>{state.count}</span>)
  }
  return (
    <div
      className={'relative cursor-pointer hover:text-[#51b680]'}
      onClick={handleClick}
    >
      <Tooltip text={t('forward')}>
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
