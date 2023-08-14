'use client'
import { useQuery } from '@apollo/client'
import GetLikePost from '@api/like/GetLikePost.gql'
import { useEffect, useState } from 'react'
import Aside from '@/components/aside/Aside'
import { UserStore } from '@/store'
import type { PostType } from '@/types'
import Post from '@/components/post/Post'

export default function App() {
  const { name } = UserStore(s => s.user)
  const { data, loading } = useQuery(GetLikePost, { variables: { userName: name } })
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    if (!loading)
      setPosts(data.getLikePost)
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
