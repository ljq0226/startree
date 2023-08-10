import type { ReactNode } from 'react'
import Aside from '@/components/aside/Aside'

interface Props {
  children: ReactNode
}

function layout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col main-container">
        {children}
      </div>
      <Aside />
    </>
  )
}

export default layout
