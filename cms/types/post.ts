import type { ProfileCount, UserProfile } from './user'

export interface Like {
  postId: number
  userName: string
}
export interface Forward {
  postId: number
  userName: string
}
export interface PostCount {
  forward: number
  isForward: boolean
  isLike: boolean
  isReply: boolean
  isStar: boolean
  like: number
  reply: number
}

export interface PostType {
  id: number
  createdAt: Date | string
  content: string
  user: UserProfile
  postCount: PostCount
  profileCount: ProfileCount
}
export interface PostReplyType {
  id: number
  createdAt: Date | string
  content: string
  replys: PostReplyType[]
  user: UserProfile
  postCount: PostCount
  profileCount: ProfileCount
}
