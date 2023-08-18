'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetPostReply from '@api/post/GetPostReply.gql'
import type { PostReplyType } from '@/types'
import Reply from '@/components/post/Reply/Reply'
import ReplyEdit from '@/components/editor/ReplyEdit'

interface Props {
  name: string
  postId: number
}

export default function PostReply({ name, postId }: Props) {
  const [postReply, setPostReply] = useState<PostReplyType[]>([])
  const { data, loading, refetch } = useQuery(
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
        <ReplyEdit parentId={postId} refetch={refetch}/>
      </div>
      {postReply.map((reply) => {
        return (
          <Reply {...reply} key={reply.id} />
        )
      })}

    </div>
  )
}
