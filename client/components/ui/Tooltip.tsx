'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type direction = 'top' | 'bottom' | 'left' | 'right'
interface TooltipProps {
  text: string
  position?: direction
  children?: React.ReactNode
}
interface TooltipStyle {
  left?: string
  top?: string
  arrowLeft?: string
  arrowTop?: string
  rotate?: string
}
const initStyle = { left: '', top: '', arrowLeft: '', arrowTop: '', rotate: '' }
const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'bottom' }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  const [style, setStyle] = useState<TooltipStyle>(initStyle)
  useEffect(() => {
    const res = getTooltipPosition(position) as TooltipStyle
    setStyle(res)
  }, [showTooltip])
  function getTooltipPosition(position: direction) {
    if (!targetRef.current || !tooltipRef.current)
      return {}
    const targetRect = targetRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    switch (position) {
      case 'bottom': return {
        left: targetRect.width / 2 - tooltipRect.width / 2,
        top: targetRect.height + 5,
        arrowTop: -(tooltipRect.height / 2 - 10),
        rotate: '45deg',

      }
      case 'top': return {
        left: targetRect.width / 2 - tooltipRect.width / 2,
        top: -(targetRect.height + 15),
        arrowLeft: '',
        arrowTop: (tooltipRect.height / 2 + 9),
        rotate: '-135deg',
      }
      case 'left': return {
        left: -(tooltipRect.width + 10),
        top: -(tooltipRect.height / 2 - targetRect.height / 2),
        arrowLeft: tooltipRect.width - 6,
        rotate: '135deg',
      }
      case 'right': return {
        left: (targetRect.width + 10),
        top: -(tooltipRect.height / 2 - targetRect.height / 2),
        arrowLeft: -5,
        rotate: '-45deg',
      }
      default: return initStyle
    }
  }

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }
  return (
    <div className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={targetRef}>{children}</div>
      {
        showTooltip
        && <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showTooltip ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={'tooltip'} style={{ left: style.left, top: style.top }} ref={tooltipRef}
        >
          <div className="relative z-[2]">{text}</div>
          <div className="absolute" style={{ left: style.arrowLeft, top: style.arrowTop }}>
            <div
              style={{ rotate: style.rotate }}
              className='tooltip-arrow'>
            </div>
          </div>
        </motion.div>
      }
    </div>
  )
}

export default Tooltip
