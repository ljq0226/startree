'use client'
import { useEffect, useState } from 'react'
import GetHomePost from '@api/post/GetHomePost.gql'
import { useLazyQuery } from '@apollo/client'
import { shallow } from 'zustand/shallow'
import EditPost from '../editor/EditPost'
import Post from '../post/Post'
import Skeleton from '../ui/Skeleton'
import type { PostType } from '@/types'
import { PostStore, UserStore } from '@/store'
import useI18n from '@/hooks/theme/useI18n'
import { USERINFO } from '@/constants'

function Home({ homeRef }: { homeRef: React.RefObject<HTMLDivElement> }) {
  const [user, setUser] = UserStore(s => [s.user, s.setUser], shallow)
  const t = useI18n('common')
  const [homePost, setHomePost] = useState<PostType[]>([])
  const newPost = PostStore(s => s.newPost)
  const deletePostId = PostStore(s => s.deletePostId)
  const [pageIndex, setPageIndex] = useState(1)
  const [showData, setShowData] = useState(false)

  const [getHomePost] = useLazyQuery(GetHomePost)

  const setUserInfo = () => {
    const info = localStorage.getItem(USERINFO) as string
    const _info = JSON.parse(info)
    setUser({
      ..._info,
    })
  }

  const getHomeData = async (name: string) => {
    const { loading, data } = await getHomePost({ variables: { name, pageIndex } })
    if (!loading)
      setHomePost([...homePost, ...data?.getHomePost])
  }

  useEffect(() => {
    const info = localStorage.getItem(USERINFO) as string
    const _info = JSON.parse(info)
    !user.name && setUserInfo()
    getHomeData(_info.name)
  }, [pageIndex])

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
      const timerId = setTimeout(() => {
        setShowData(true)
      }, 1000)
      return () => {
        element.removeEventListener('scroll', handleScroll)
        clearTimeout(timerId)
      }
    }
  }, [])

  return (
    <div
      className='flex flex-col main-container'
    >
      <div className='min-h-[30px]'></div>
      <EditPost />
      {showData
        ? <>
          <div className="flex flex-col mt-8">
            {
              homePost.map((post) => {
                return (
                  <Post key={post.id} {...post} />
                )
              })
            }
          </div>
          <div className='min-h-[50px] text-center '>{t('end_of_list')}</div></>
        : <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      }
    </div>
  )
}

export default Home
