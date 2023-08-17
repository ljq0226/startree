import { create } from 'zustand'
import type { PostType } from '@/types'

interface PostState {
  newPost: PostType
  deletePostId: number
  setNewPost: (v: PostType) => void
  setDeletePostId: (v: number) => void
}
const initPost: PostType = {
  id: 1,
  createdAt: '',
  content: '',
  user: {
    name: '',
    nickName: '',
    image: '',
    bio: '',
  },
  postCount: {
    forward: 0,
    isForward: false,
    isLike: false,
    isReply: false,
    isStar: false,
    like: 0,
    reply: 0,
  },
  profileCount: {
    followings: 0,
    followed: 0,
    posts: 0,
  },
}
const PostStore = create<PostState>(set => ({
  newPost: initPost,
  deletePostId: 0,
  setNewPost: (v) => {
    set(() => ({
      newPost: v,
    }))
  },
  setDeletePostId: (v) => {
    set(() => ({
      deletePostId: v,
    }))
  },

}))

export { PostStore }
