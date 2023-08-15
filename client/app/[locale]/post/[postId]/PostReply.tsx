'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetPostReply from '@api/post/GetPostReply.gql'
import type { PostReplyType } from '@/types'
import Reply from '@/components/post/Reply/Reply'
import EditPost from '@/components/post/EditPost'

interface Props {
  name: string
  postId: number
}

export default function PostReply({ name, postId }: Props) {
  const [postReply, setPostReply] = useState<PostReplyType[]>([])
  const { data, loading } = useQuery(
    GetPostReply,
    {
      variables: {
        postId,
        name,
      },
    },
  )
  useEffect(() => {
    if (!loading)
      setPostReply(data.getPostReply)
  }, [data])
  return (
    <div>
      <div className="my-4">
        <EditPost />
      </div>
      {postReply.map((reply) => {
        return (
          <Reply {...reply} key={reply.id} />
        )
      })}

    </div>
  )
}
