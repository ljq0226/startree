'use client'
import React from 'react'
import cn from 'clsx'
import useI18n from '@/hooks/theme/useI18n'
import Tooltip from '@/components/ui/Tooltip'
import Icon from '@/components/ui/Icon'

export default function StarIcon() {
  const t = useI18n('action')
  return (
    <div className={'relative cursor-pointer hover:text-[#f4ce3f]'}>
      <Tooltip text={t('bookmark')}>
        <button className={cn('post-icon')} >
          <Icon icon={'iconamoon:star'} height={18} />
        </button>
      </Tooltip>
    </div>
  )
}
