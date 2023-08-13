'use client'
import { useQuery } from '@apollo/client'
import FindAllPost from '@api/post/FindAllPost.gql'
import { useEffect, useState } from 'react'

import Aside from '@/components/aside/Aside'
import PostItem from '@/components/post/Post'
import type { PostType } from '@/types'

export default function App() {
  const { data, loading } = useQuery(FindAllPost)

  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    if (!loading)
      setPosts(data.findAllPost)
  }, [data])
  return (
    <>
      <div className="flex flex-col main-container">
        <div className="hidden h-6 xl:block"></div>
        {
          posts.map((post) => {
            return (
              <PostItem key={post.id} {...post} />
            )
          })
        }
      </div>
      <Aside />
    </>

  )
}
