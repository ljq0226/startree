'use client'
import { useQuery } from '@apollo/client'
import FindAllPost from '@api/post/FindAllPost.gql'
import { useEffect, useRef, useState } from 'react'

import Aside from '@/components/aside/Aside'
import PostItem from '@/components/post/Post'
import type { PostType } from '@/types'
import { UserStore } from '@/store'

export default function App() {
  const { name } = UserStore(s => s.user)
  const [pageIndex, setPageIndex] = useState(1)
  const { data, loading } = useQuery(FindAllPost, { variables: { name, pageIndex } })
  const [posts, setPosts] = useState<PostType[]>([])
  const exploreRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!loading)
      setPosts([...data.findAllPost])
  }, [data])
  return (
    <>
      <div className="flex flex-col main-container"
      >
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
