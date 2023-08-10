import cn from 'clsx'
import Avatar from '../ui/Avatar'
import type { AtUser } from '@/types'

interface Props {
  user: AtUser
  isActive: boolean
}
function AtUserInfo({ user, isActive }: Props) {
  return (
    <div
      key={user.name}
      className={cn('relative flex p-2 cursor-pointer hover-animation', isActive ? 'bg-active' : '')}
    >
      <Avatar src={user.image} height={10} round />
      <div className="ml-4">{user.nickName}</div>
      <div className="ml-1 text-secondary">{`@${user.name}`}</div>
    </div>
  )
}

export default AtUserInfo
