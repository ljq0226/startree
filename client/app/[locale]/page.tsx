'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import type { UserAuth } from '@/types/user'
import { UserStore } from '@/store'

export default function IndexPage() {
  const { data: session } = useSession()
  const setUser = UserStore(s => s.setUser)
  if (session) {
    const user = session.user as UserAuth
    setUser(user)
    redirect('/home')
  }
  else {
    redirect('/intro')
  }
}
