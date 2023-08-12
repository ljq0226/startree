import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CreateUser } from '@api/user/CreateUser.gql'
import type { UserAuth } from '@/types/user'
import { USERINFO } from '@/constants'
import { UserStore } from '@/store'

function useLogin() {
  const { data: session } = useSession()
  const setUser = UserStore(s => s.setUser)
  const [createUser] = useMutation(CreateUser)
  useEffect(() => {
    const create = async () => {
      if (session) {
        const info = localStorage.getItem(USERINFO) as string
        const _info = JSON.parse(info)
        setUser({
          ..._info,
        })
        if (!info) {
          const { data } = await createUser({
            variables: {
              createUserInput: {
                ...session?.user,
              },
            },
          })
          localStorage.setItem(USERINFO, JSON.stringify(data.createUser))
          const userData = data.createUser as UserAuth
          setUser({
            ...userData,
          })
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
