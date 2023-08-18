'use client'
import { useEffect, useState } from 'react'
import GetHomePost from '@api/post/GetHomePost.gql'
import { useQuery } from '@apollo/client'
import EditPost from '../editor/EditPost'
import Post from '../post/Post'
import type { PostType } from '@/types'
import { PostStore, UserStore } from '@/store'
import useI18n from '@/hooks/theme/useI18n'

function Home({ homeRef }: { homeRef: React.RefObject<HTMLDivElement> }) {
  const user = UserStore(s => s.user)
  const t = useI18n('common')
  const [homePost, setHomePost] = useState<PostType[]>([])
  const newPost = PostStore(s => s.newPost)
  const deletePostId = PostStore(s => s.deletePostId)
  const [pageIndex, setPageIndex] = useState(1)
  const { data, loading } = useQuery(
    GetHomePost, { variables: { name: user.name, pageIndex } })

  useEffect(() => {
    if (!loading)
      setHomePost([...homePost, ...data.getHomePost])
  }, [data])

  useEffect(() => {
    setHomePost([newPost, ...homePost])
  }, [newPost])

  useEffect(() => {
    const newPosts = homePost.filter(post => post.id !== deletePostId)
    setHomePost(newPosts)
  }, [deletePostId])
  useEffect(() => {
    const handleScroll = () => {
      const element = homeRef?.current
      if (element) {
        const { scrollTop, scrollHeight, clientHeight } = element
        if (scrollTop + clientHeight === scrollHeight)
          setPageIndex(pre => pre + 1)
      }
    }
    const element = homeRef?.current
    if (element) {
      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  return (
    <div
      className='flex flex-col main-container'
    >
      <div className='min-h-[30px]'></div>
      <EditPost />
      <div className="flex flex-col mt-8">
        {
          homePost.map((post) => {
            return (
              <Post key={post.id} {...post} />
            )
          })
        }
      </div>
      <div className='min-h-[50px] text-center '>{t('end_of_list')}</div>
    </div>
  )
}

export default Home
