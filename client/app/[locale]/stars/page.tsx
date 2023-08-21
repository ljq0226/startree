'use client'
import { useQuery } from '@apollo/client'
import GetStarPost from '@api/star/GetStarPost.gql'
import { useEffect, useState } from 'react'
import { UserStore } from '@/store'
import Aside from '@/components/aside/Aside'
import type { PostType } from '@/types'
import Post from '@/components/post/Post'
import useI18n from '@/hooks/theme/useI18n'
import Skeleton from '@/components/ui/Skeleton'

export default function App() {
  const { name } = UserStore(s => s.user)
  const t = useI18n('common')
  const { data, loading } = useQuery(GetStarPost, { variables: { userName: name } })
  const [posts, setPosts] = useState<PostType[]>([])
  const [showData, setShowData] = useState(false)
  useEffect(() => {
    if (!loading)
      setPosts(data.getStarPost)
  }, [data])
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowData(true)
    }, 1000)
    return () => {
      clearTimeout(timerId)
    }
  }, [])
  return (
    <div className='flex w-full overflow-x-hidden overflow-y-auto'>
      <div className="flex flex-col main-container">
        <div className="hidden h-6 xl:block"></div>
        {
          showData
            ? <>
              {
                posts.map((post) => {
                  return (
                    <Post key={post.id} {...post} />
                  )
                })
              }
              <div className='min-h-[50px] text-center '>{t('end_of_list')}</div>
            </>
            : <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
        }

      </div>
      <Aside />
    </div >
  )
}
