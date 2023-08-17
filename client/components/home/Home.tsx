'use client'
import { useEffect, useState } from 'react'
import GetHomePost from '@api/post/GetHomePost.gql'
import { useQuery } from '@apollo/client'
import EditPost from '../editor/EditPost'
import Post from '../post/Post'
import type { PostType } from '@/types'
import { PostStore, UserStore } from '@/store'

function Home() {
  const user = UserStore(s => s.user)
  const [homePost, setHomePost] = useState<PostType[]>([])
  const newPost = PostStore(s => s.newPost)
  const deletePostId = PostStore(s => s.deletePostId)
  const { data, loading } = useQuery(
    GetHomePost, { variables: { name: user.name } })
  useEffect(() => {
    if (!loading)
      setHomePost(data.getHomePost)
  }, [data])
  useEffect(() => {
    setHomePost([newPost, ...homePost])
  }, [newPost])

  useEffect(() => {
    const newPosts = homePost.filter(post => post.id !== deletePostId)
    setHomePost(newPosts)
  }, [deletePostId])
  return (
    <>
      <div className="h-6"></div>
      <EditPost />
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
