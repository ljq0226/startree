import SettingImage from '@/components/settings/SettingImage'
import Settings from '@/components/settings/Settings'

export default function App() {
  return (
    <>
      <div className="flex flex-col min-w-[500px] xl:min-w-[365px]">

        <Settings />
      </div>
      <SettingImage />
    </>

  )
}
