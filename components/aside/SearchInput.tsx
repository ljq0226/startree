'use client'
import React, { useState } from 'react'
import cn from 'clsx'
import Icon from '@/components/ui/Icon'
import useI18n from '@/hooks/theme/useI18n'

function SearchInput() {
  const [isActive, setIsActive] = useState(false)
  const t = useI18n('search')
  return (
    <>
      <header className={cn('relative w-full h-10 mx-1 mt-4 border rounded-xl', isActive ? 'border-primary' : 'border-base')}>
        <div className="flex w-full px-2 py-1 flex-center">
          <div className='flex mx-4 flex-center'>
            <Icon icon='ri:search-line' height={16} />
          </div>
          <input
            type="text"
            placeholder={t('label')}
            className='w-full border-0 outline-none bg-base'
            onFocus={() => setIsActive(!isActive)}
            onBlur={() => setIsActive(!isActive)}
          />
        </div>
      </header>
      <div className={cn('absolute w-full h-10 mx-1 mt-16 border rounded-full border-base', isActive ? 'block' : 'hidden')}>
        <p className='flex h-full text-sm flex-center text-secondary'>
          {t('search_desc')}
        </p>
      </div>
    </>

  )
}

export default SearchInput
