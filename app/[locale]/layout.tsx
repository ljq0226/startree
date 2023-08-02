import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import Sidebar from '@/components/sidebar/SideBar'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

const inter = Inter({ subsets: ['latin'] })
interface Props {
  children: ReactNode
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'StarTree',
  description: 'Generated by create next app',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  }
  catch (error) {
    notFound()
  }

  return (
    <html lang={locale} className='dark'>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div
            className="flex justify-center w-screen h-screen gap-0 overflow-x-hidden overflow-y-auto bg-base text-bs xl:gap-3"
            style={{
              fontSize: 'var(--font-size)',
            }}
          >
            <Sidebar />
            <div className="xl:min-w-[900px] flex ">
              {children}
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
