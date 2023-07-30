'use client'
import useI18n from '@/hooks/useI18n'

function FontSize() {
  const t = useI18n('settings.interface')
  return (
    <div>
      <p className="font-medium">{t('font_size')}</p>
      <div className="w-full p-2 border border-base">

        <input type="range" className="w-full" />

      </div>

    </div>
  )
}

export default FontSize
