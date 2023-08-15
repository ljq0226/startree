'use client'
import Icon from '@/components/ui/Icon'

interface Props {
  position: { x: number; y: number }
}
export default function Fetching({ position }: Props) {
  return (
    <div
      className='flex items-center p-3 text-sm border rounded-lg w-28 border-base text-secondary'
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
      }}
    >
      <Icon icon='eos-icons:bubble-loading' height={14} className='mr-1' />
      <span>Fetching...</span>
    </div>
  )
}
