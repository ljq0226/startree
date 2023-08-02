import cn from 'clsx'
import Image from 'next/image'

interface Props {
  src: string
  height?: number
  round?: boolean
  className?: string
}

function Avatar({ src, height = 12, round = false, className }: Props) {
  return (
    <div className={cn('overflow-hidden', `w-[${height}] h-[${height}] max-h-[${height}]`, round ? 'rounded-full' : 'rounded-xl', className)}>
      <Image src={src} height={height * 4} width={height * 4} alt='' />
    </div>
  )
}

export default Avatar
