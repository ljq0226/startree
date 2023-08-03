import { create } from 'zustand'

export interface UserAuth {
  name: string
  image: string
  email: string

}

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

export default UserStore
