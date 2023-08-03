'use client'
// import Aside from '@/components/aside/Aside'
import { useSession } from 'next-auth/react'

export default function App() {
  const { data: session, status } = useSession()
  if (status === 'authenticated')
    return <p>Signed in as {session.user?.email}</p>

  return <a href="/api/auth/signin">Sign in</a>

  // return (
  //   <>
  //     <div className="main-container">compose</div>
  //     <Aside />
  //   </>

  // )
}
