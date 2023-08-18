'use client'
import { useEffect, useState } from 'react'

export default function useQueryInputModal() {
  const [isShow, setIsShow] = useState<boolean>(false)
  const handleClick = () => {
    setIsShow(false)
  }
  useEffect(() => {
    if (isShow)
      document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [isShow])
  return {
    isShow,
    setIsShow,
  }
}
