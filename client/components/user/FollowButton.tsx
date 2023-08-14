'use client'
import React, { useEffect, useState } from 'react'
import FindIsFollowing from '@api/follow/FindIsFollowing.gql'
import CreateFollow from '@api/follow/CreateFollow.gql'
import RemoveFollow from '@api/follow/RemoveFollow.gql'
import { useMutation, useQuery } from '@apollo/client'
import useI18n from '@/hooks/theme/useI18n'

interface Props {
  name: string
  userName: string
}
function FollowButton({ name, userName }: Props) {
  const t = useI18n('account')
  const { data, loading, refetch } = useQuery(FindIsFollowing, { variables: { name, userName } })
  const [createFollow] = useMutation(CreateFollow)
  const [removeFollow] = useMutation(RemoveFollow)
  const [isFollowing, setIsFollowing] = useState(false)
  useEffect(() => {
    if (!loading)
      setIsFollowing(data.findIsFollowing)
  }, [data])
  const handleUnfollow = async () => {
    await removeFollow({
      variables: {
        removeFollowInput: {
          name,
          followedName: userName,
        },
      },
    })
    refetch({ name, userName })
  }
  const handleFollow = async () => {
    await createFollow({
      variables: {
        createFollowInput: {
          name,
          followedName: userName,
        },
      },
    })
    refetch({ name, userName })
  }
  return (
    <div className='flex flex-center'>
      {
        isFollowing
          ? <button className='min-w-[100px] px-4 py-1 border rounded-3xl hover:text-error hover:border-error'
            onClick={handleUnfollow}
            onMouseEnter={(e) => {
              e.currentTarget.innerHTML = t('unfollow')
            }}
            onMouseLeave={(e) => {
              e.currentTarget.innerHTML = t('following')
            }}
          >
            {t('following')}
          </button>
          : <button className='min-w-[100px] px-4 py-1 border border-primary rounded-3xl bg-primary hover:text-primary hover:bg-base'
            onClick={handleFollow}
          >
            {t('follow')}
          </button>
      }
    </div>

  )
}

export default FollowButton
