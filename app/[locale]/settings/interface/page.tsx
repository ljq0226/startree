import ColorMode from '@/components/settings/interface/ColorMode'
import FontSize from '@/components/settings/interface/FontSize'
import ThemeColor from '@/components/settings/interface/ThemeColor'

function page() {
  return (
    <div className='flex flex-col p-6 space-y-2 settings-container'>
      <div className='hidden h-6 xl:block'></div>
      <FontSize />
      <ColorMode />
      <ThemeColor />

    </div>
  )
}

export default page
