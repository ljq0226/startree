import React from 'react'
import { Icon as Iconify } from '@iconify/react'

interface IconProps {
  icon: string
  height?: number
  color?: string
  className?: string
}

function Icon({ icon, height = 32, color, className }: IconProps) {
  return (
    <>
      <Iconify
        icon={icon}
        height={height}
        color={color}
        className={className}

      />
    </>
  )
}

export default Icon
