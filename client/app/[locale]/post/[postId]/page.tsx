'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetPostById from '@api/post/GetPostById.gql'
import Aside from '@/components/aside/Aside'
import type { PostType } from '@/types'
import Post from '@/components/post/Post'

interface Props {
  params: {
    postId: string
  }
}

function page({ params }: Props) {
  const [post, setPost] = useState<PostType>()
  const { data, loading } = useQuery(
    GetPostById,
    {
      variables: {
        id: +params.postId,
      },
    },
  )
  useEffect(() => {
    if (data)
      setPost(data.getPostById)
  }, [data])
  return (
    <>
      <div className="flex flex-col main-container">
        <div className="block xl:h-8"></div>
        <Post {...post as PostType} />
      </div>
      <Aside />
    </>
  )
}

export default page
