'use client'
import { useEffect, useState } from 'react'
import FindHomePost from '@api/post/FindHomePost.gql'
import { useQuery } from '@apollo/client'
import EditPost from '../editor/EditPost'
import Post from '../post/Post'
import type { PostType } from '@/types'
import { UserStore } from '@/store'

function Home() {
  const user = UserStore(s => s.user)
  const [homePost, setHomePost] = useState<PostType[] | []>([])
  // const { data, loading } = useQuery(
  //   FindHomePost, { variables: { name: user.name } })
  // useEffect(() => {
  //   if (data)
  //     // setHomePost(data.findHomePost)
  // }, [data])

  return (
    <>
      <div className="h-6"></div>
      <EditPost />
      {/* <div className="flex-1"></div> */}
      <div className="flex flex-col">
        {
          homePost.map((post) => {
            return (
              <Post key={post.id} {...post} />
            )
          })
        }
      </div>
    </>
  )
}

export default Home
