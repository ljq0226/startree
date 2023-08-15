'use client'
import React from 'react'
import cn from 'clsx'
import useI18n from '@/hooks/theme/useI18n'
import Tooltip from '@/components/ui/Tooltip'
import Icon from '@/components/ui/Icon'

interface Props {
  count: number
}

export default function CommentIcon({ count }: Props) {
  const t = useI18n('action')
  const RenderCount = () => {
    return count ? <span>{count}</span> : <></>
  }
  return (
    <div className={'relative cursor-pointer hover:text-[#4799ec]'}>
      <Tooltip text={t('reply')}>
        <button className={cn('post-icon')} >
          <Icon icon={'octicon:comment-16'} height={18} />
        </button>
      </Tooltip>
      <div className='absolute top-1 left-8'>
        {RenderCount()}
      </div>

    </div>
  )
}
