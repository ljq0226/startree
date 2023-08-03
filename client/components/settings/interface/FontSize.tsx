'use client'
import cn from 'clsx'
import useFontSize from '@/hooks/theme/useFontSize'
import useI18n from '@/hooks/theme/useI18n'
import { createFontArr } from '@/lib'

function FontSize() {
  const t = useI18n('settings.interface')
  const fontArr = createFontArr()
  const { fontSize, setFontSize } = useFontSize()
  const clickHandle = (size: string) => {
    setFontSize(size)
  }

  return (
    <div>
      <p className="font-medium">{t('font_size')}</p>
      <div className="flex w-full p-2 px-4 space-x-2 border border-base">
        <p className={'flex flex-center text-xs'}>Aa</p>
        <div className="relative flex flex-1 px-2 cursor-pointer flex-center ">

          <div className='flex items-center justify-between w-full '>
            {
              fontArr.map((size) => {
                return (
                  <div
                    key={size}
                    className={cn('w-4 h-4 rounded-full z-[1] ',
                      size === fontSize ? 'bg-primary scale-125' : 'bg-text-secondary-light',
                    )}
                    onClick={() => clickHandle(size)}
                  >
                  </div>
                )
              })
            }

          </div>
          <div className="absolute w-[90%] bg-text-secondary-light h-[1px]"></div>

        </div>

        <p className={'flex flex-center text-lg'}>Aa</p>
      </div>

    </div>
  )
}

export default FontSize
