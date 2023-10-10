'use client'

import { UserStore } from "@/store"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { name } = UserStore(s => s.user)
  useEffect(() => {
    !name && redirect('/login')
  }, [name])
  return (
    <div>
    </div>
  )
}
