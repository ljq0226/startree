'use client'
import useI18n from '@/hooks/useI18n'
import Icon from '@/components/ui/Icon'

function ColorMode() {
  const t = useI18n('settings.interface')
  return (
    <div>
      <p className="font-medium">{t('color_mode')}</p>
      <div className="flex w-full p-2 space-x-4">

        <div className="flex px-4 py-2 border border-base flex-center">
          <div className="flex">
            <Icon icon='ri:moon-line' />
            <p className='flex ml-1 flex-center'>{t('dark_mode')}</p>
          </div>
        </div>
        <div className="flex px-4 py-2 border border-base flex-center">
          <div className="flex">
            <Icon icon='ri:sun-line' />
            <p className='flex ml-1 flex-center'>{t('light_mode')}</p>
          </div>
        </div>
        <div className="flex px-4 py-2 border border-base flex-center">
          <div className="flex">
            <Icon icon='ri:computer-line' />
            <p className='flex ml-1 flex-center'>{t('system_mode')}</p>
          </div>
        </div>
      </div></div>
  )
}

export default ColorMode
