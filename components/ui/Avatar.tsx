import cn from 'clsx'
import Image from 'next/image'

interface Props {
  src: string
  height?: number
  className?: string
}

function Avatar({ src, height = 15, className }: Props) {
  return (
    <div className={cn('rounded-xl overflow-hidden', `w-[${height}] h-[${height}]`, className)}>
      <Image src={src} height={height * 4} width={height * 4} alt='' />
    </div>
  )
}

export default Avatar
