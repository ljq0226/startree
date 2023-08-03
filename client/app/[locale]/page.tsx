'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import type { UserAuth } from '@/store/user'
import UserStore from '@/store/user'

export default function IndexPage() {
  const { data: session, status } = useSession()
  const setUser = UserStore(s => s.setUser)
  if (session) {
    const user = session.user as UserAuth
    setUser(user)
  }

  redirect('/home')
}