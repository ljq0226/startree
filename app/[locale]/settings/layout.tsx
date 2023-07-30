import type { ReactNode } from 'react'
import Settings from '@/components/settings/Settings'

function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-w-[500px] xl:min-w-[365px] border-r border-base">
        <Settings />
      </div>
      <div className='settings-container'>{children}</div>
    </>
  )
}

export default SettingsLayout
