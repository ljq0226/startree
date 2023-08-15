'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetPostById from '@api/post/GetPostById.gql'
import PostReply from './PostReply'
import PostContent from './PostContent'
import Aside from '@/components/aside/Aside'
import type { PostType } from '@/types'
import { UserStore } from '@/store'
import ReplyListItem from '@/components/post/Reply/ReplyListItem'

interface Props {
  params: {
    postId: string
  }
}

function page({ params }: Props) {
  const [post, setPost] = useState<PostType[]>([])

  const { name } = UserStore(s => s.user)
  const { data, loading } = useQuery(
    GetPostById,
    {
      variables: {
        id: +params.postId,
        name,
      },
    },
  )

  useEffect(() => {
    if (!loading)
      setPost(data.getPostById)
  }, [data])

  useEffect(() => {
  }, [post])

  const RenderPost = () => {
    if (!loading) {
      if (post.length === 1) {
        return <PostContent {...post[0]} />
      }
      else {
        return (post.map((post) => {
          return (
            <div key={post.id}>
              <ReplyListItem {...post as any} />
            </div>)
        }))
      }
    }
    return <></>
  }
  const RenderReply = () => {
    return !loading ? <PostReply name={name} postId={+params.postId} /> : <></>
  }
  return (
    <>
      <div className="flex flex-col main-container">
        <div className="block xl:h-8"></div>
        {RenderPost()}
        {RenderReply()}
      </div>
      <Aside />
    </>
  )
}

export default page
