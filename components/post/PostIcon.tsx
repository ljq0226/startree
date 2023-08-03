'use client'

import { useRef } from 'react'
import cn from 'clsx'
import Icon from '../ui/Icon'
import Tooltip from '../ui/Tooltip'
import useI18n from '@/hooks/theme/useI18n'

export interface PostIconProps {
  icon: string
  tooltip: string
  color: string
  handleClick?: () => void
}
export default function PostIcon({ icon, tooltip, color }: PostIconProps) {
  const t = useI18n('action')
  const btnRef = useRef(null)
  const hover = `hover:text-[${color}]`
  console.log(' ', hover)
  return (
    <div ref={btnRef} className={'relative cursor-pointer'}>
      <Tooltip text={t(tooltip)}>
        <button className={cn('post-icon')} >
          <Icon icon={icon} height={18} className={`hover:text-[${color}]`} />
        </button>
      </Tooltip>
      <div className='absolute top-1 left-8'>
        {tooltip !== 'bookmark'
          && <span className={hover}>12</span>}
      </div>

    </div>
  )
}
