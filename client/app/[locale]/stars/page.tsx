'use client'
import { useQuery } from '@apollo/client'
import GetStarPost from '@api/star/GetStarPost.gql'
import { useEffect, useState } from 'react'
import { UserStore } from '@/store'
import Aside from '@/components/aside/Aside'
import type { PostType } from '@/types'
import Post from '@/components/post/Post'

export default function App() {
  const { name } = UserStore(s => s.user)
  const { data, loading } = useQuery(GetStarPost, { variables: { userName: name } })
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    if (!loading)
      setPosts(data.getStarPost)
  }, [data])
  return (
    <>
      <div className="flex flex-col main-container">
        <div className="hidden h-6 xl:block"></div>
        {
          posts.map((post) => {
            return (
              <Post key={post.id} {...post} />
            )
          })
        }
        <div className="flex p-6 flex-center">
          End of the list
        </div>
      </div>
      <Aside />
    </>
  )
}
