'use client'
import React from 'react'
import Icon from '@/components/ui/Icon'
import useI18n from '@/hooks/useI18n'

function SettingImage() {
  const t = useI18n('settings')
  return (
    <div className='hidden xl:flex xl:min-w-[500px] flex-center'>
      <div className='flex flex-col flex-center'>
        <Icon icon='ri:settings-3-line' height={48} />
        <p>{t('select_a_settings')}</p>
      </div>

    </div>
  )
}

export default SettingImage
