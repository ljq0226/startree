import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CreateUser } from '@api/user/CreateUser.gql'
import type { UserAuth } from '@/types/user'
import { USERINFO } from '@/constants'
import UserStore from '@/store/user'

function useLogin() {
  const { data: session } = useSession()
  const setUser = UserStore(s => s.setUser)
  const [createUser] = useMutation(CreateUser)
  useEffect(() => {
    const create = async () => {
      if (session) {
        const userInfo = session.user as UserAuth
        setUser(userInfo)
        const info = localStorage.getItem(USERINFO) as string
        if (!info) {
          const { data } = await createUser({
            variables: {
              createUserInput: {
                name: session.user?.name,
                email: session.user?.email,
                image: session.user?.image,
              },
            },
          })
          localStorage.setItem(USERINFO, JSON.stringify(data.createUser))
        }
      }
    }
    create()
  }, [session])
  return (
    { session }
  )
}

export default useLogin
