import React from 'react'
import SearchInput from './SearchInput'
import BottomSide from './BottomSide'

function Aside() {
  return (
    <aside className='hidden lg:w-1/5 xl:w-1/4 sm:none xl:block min-w-[265px]'>
      <div className='sticky top-0 flex flex-col h-screen'>
        <SearchInput />
        <div className="flex-1"></div>
        <BottomSide />
      </div>

    </aside>
  )
}

export default Aside
