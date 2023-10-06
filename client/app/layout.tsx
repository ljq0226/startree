import '@/styles/theme.css'
import '@/styles/globals.css'

import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
