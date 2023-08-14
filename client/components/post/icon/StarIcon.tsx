'use client'
import React, { useEffect, useState } from 'react'
import cn from 'clsx'
import CreateStar from '@api/Star/CreateStar.gql'
import DeleteStar from '@api/Star/DeleteStar.gql'
import { useMutation } from '@apollo/client'
import useI18n from '@/hooks/theme/useI18n'
import Tooltip from '@/components/ui/Tooltip'
import Icon from '@/components/ui/Icon'
import { UserStore } from '@/store'

interface Props {
  postId: number
  isStar: boolean
}

export default function StarIcon({ postId, isStar }: Props) {
  const t = useI18n('action')
  const { name } = UserStore(s => s.user)
  const [createStar] = useMutation(CreateStar)
  const [deleteStar] = useMutation(DeleteStar)
  const [state, setState] = useState(isStar)

  useEffect(() => {
    setState(isStar)
  }, [isStar])

  const handelDelete = async () => {
    await deleteStar({
      variables: {
        deleteStarInput: {
          postId,
          userName: name,
        },
      },
    })
    setState(false)
  }
  const handelCreate = async () => {
    await createStar({
      variables: {
        createStarInput: {
          postId,
          userName: name,
        },
      },
    })
    setState(true)
  }
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    state ? handelDelete() : handelCreate()
  }
  const RenderIcon = () => {
    return state
      ? (<Icon
        color='#f4ce3f'
        icon={'tabler:star-filled'}
        height={18}
      />)
      : (<Icon
        icon={'tabler:star'}
        height={18}
      />)
  }

  return (
    <div
      className={'relative cursor-pointer hover:text-[#f4ce3f]'}
      onClick={handleClick}
    >
      <Tooltip text={t('star')}>
        <button className={cn('post-icon')} >
          {RenderIcon()}
        </button>
      </Tooltip>
    </div>
  )
}
