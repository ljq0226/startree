'use client'
import { useRef } from 'react'
import Aside from '@/components/aside/Aside'
import Home from '@/components/home/Home'
import ReportModal from '@/components/modal/ReportModal'

export default function App() {
  const homeRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className='flex w-full overflow-x-hidden overflow-y-auto'
      ref={homeRef} >
      <Home homeRef={homeRef} />
      <Aside />
      <div className='flex-1' />
      <ReportModal />
    </div>
  )
}
