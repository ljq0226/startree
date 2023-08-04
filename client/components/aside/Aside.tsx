import React from 'react'
import SearchInput from './SearchInput'

// import BottomSide from './BottomSide'

function Aside() {
  return (
    <aside className='sticky top-0 hidden xl:flex xl:flex-col h-[100vh] xl:min-w-[265px]'>
      <SearchInput />
      <div className="flex-1"></div>
      {/* <BottomSide /> */}
    </aside>
  )
}

export default Aside
