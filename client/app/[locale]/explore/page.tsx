'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import UserStore from '@/store/user'

// import Aside from '@/components/aside/Aside'

export default function App() {
  const { data: session, status } = useSession()
  const user = UserStore(s => s.user)
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )

  // return (
  //   <>
  //     <div className="main-container">compose</div>
  //     <Aside />
  //   </>

  // )
}
