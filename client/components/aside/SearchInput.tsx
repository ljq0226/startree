'use client'
import React, { useEffect, useState } from 'react'
import cn from 'clsx'
import { useLazyQuery } from '@apollo/client'
import QueryInput from '@api/input/QueryInput.gql'
import useQueryInputModal from '../modal/hooks/useQueryInputModal'
import QueryInputModal from '../modal/QueryInputMadal'
import Icon from '@/components/ui/Icon'
import useI18n from '@/hooks/theme/useI18n'
import type { QueryInputType } from '@/types'
import { debounce } from '@/lib'

function SearchInput() {
  const [isActive, setIsActive] = useState(false)
  const t = useI18n('search')
  const [query, setQuery] = useState('')
  const { isShow, setIsShow } = useQueryInputModal()
  const [queryData, setQueryData] = useState<QueryInputType>({ users: [], tags: [] })
  const [queryInput, { data, loading }] = useLazyQuery(QueryInput)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value.trim())
    setTimeout(() => {
      setIsShow(true)
    }, 200)
  }

  useEffect(() => {
    query !== '' && queryInput({ variables: { query } })
  }, [query])
  useEffect(() => {
    if (!loading)
      setQueryData(data?.queryInput)
  }, [data])
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
            className='relative w-full border-0 outline-none bg-base'
            onFocus={() => setIsActive(!isActive)}
            onBlur={() => setIsActive(!isActive)}
            onChange={debounce(handleChange, 500)}
          />
          {isShow && <QueryInputModal {...queryData} />}
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
