'use client'
import { useQuery } from '@apollo/client'
import FindAllPost from '@api/post/FindAllPost.gql'
import { useEffect, useState } from 'react'
import { UserStore } from '@/store'

import Aside from '@/components/aside/Aside'
import PostItem from '@/components/post/Post'
import type { PostType } from '@/types'

export default function App() {
  const { data, loading } = useQuery(FindAllPost)

  const [posts, setPosts] = useState<PostType[]>([])
  const user = UserStore(s => s.user)

  useEffect(() => {
    if (data)
      setPosts(data.findAllPost)
  }, [data])
  return (
    <>
      <div className="main-container">
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
