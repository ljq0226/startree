import type { PostType } from './post'

export interface Profile {
  id: number
  bio: string
  website: string
  github: string
}
export interface UserAuth {
  name: string
  image: string
  email: string
  nickName: string
  profile: Profile
}
export interface AtUser {
  name: string
  nickName: string
  image: string
}

export interface UserData {
  name: string
  nickName: string
  image: string
  email: string
  createdAt: Date
}

export interface ProfileCount {
  followings: number
  followed: number
  posts: number
}
export interface Follow {
  name: string
  nickName: string
  image: string
}
export interface ProfileData {
  followings: Follow[]
  posts: PostType[]
  followed: Follow[]
}
