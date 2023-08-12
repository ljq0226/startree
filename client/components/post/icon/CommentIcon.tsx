'use client'
import React from 'react'
import cn from 'clsx'
import useI18n from '@/hooks/theme/useI18n'
import Tooltip from '@/components/ui/Tooltip'
import Icon from '@/components/ui/Icon'

export default function CommentIcon() {
  const t = useI18n('action')
  return (
    <div className={'relative cursor-pointer hover:text-[#4799ec]'}>
      <Tooltip text={t('reply')}>
        <button className={cn('post-icon')} >
          <Icon icon={'octicon:comment-16'} height={18} />
        </button>
      </Tooltip>
      <div className='absolute top-1 left-8'>
        <span >12</span>
      </div>

    </div>
  )
}
