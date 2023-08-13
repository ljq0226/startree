'use client'
import { create } from 'zustand'
import type { UserAuth } from '@/types/user'

interface UserState {
  user: UserAuth
  setUser: (v: UserAuth) => void
}

export const userInit = {
  name: '',
  image: '',
  email: '',
  nickName: '',
  profile: {
    id: 0,
    bio: '',
    github: '',
    website: '',
  },
}

const UserStore = create<UserState>(set => ({
  user: userInit,
  setUser: (v) => {
    set(() => ({
      user: v,
    }))
  },

}))

export { UserStore }
