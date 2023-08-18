'use client'
import { useQuery } from '@apollo/client'
import GetPostByTag from '@api/post/GetPostByTag.gql'
import { useEffect, useState } from 'react'

import PostItem from '@/components/post/Post'
import type { PostType } from '@/types'
import { UserStore } from '@/store'

interface Props {
  params: {
    tag: string
  }
}
export default function Page({ params }: Props) {
  const { name } = UserStore(s => s.user)
  const { data, loading } = useQuery(GetPostByTag, { variables: { name, tagName: params.tag } })
  const [posts, setPosts] = useState<PostType[]>([])
  useEffect(() => {
    if (!loading)
      setPosts([...data.getPostByTag])
  }, [data])
  return (
    <div>
      <div className="hidden h-6 xl:block"></div>
      {
        posts.map((post) => {
          return (
            <PostItem key={post.id} {...post} />
          )
        })
      }
    </div>
  )
}
