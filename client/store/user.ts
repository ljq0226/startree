import { create } from 'zustand'
import type { UserAuth } from '@/types/user'

interface UserState {
  user: UserAuth
  setUser: (v: UserAuth) => void
}

const UserStore = create<UserState>(set => ({
  user: {
    name: '',
    image: '',
    email: '',
  },
  setUser: v => set(() => ({
    user: v,
  })),
}))

export { UserStore }
