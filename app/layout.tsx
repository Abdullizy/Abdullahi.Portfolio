import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@fontsource/newsreader/400.css'
import '@fontsource/newsreader/400-italic.css'
import './globals.css'
import { site } from '@/lib/data'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: 'Frontend developer building fast, clear business websites that work on every phone.',
  openGraph: { title: `${site.name} | ${site.role}`, description: 'Fast, clear websites for businesses that want to be taken seriously.', type: 'website' },
}

export const viewport: Viewport = { themeColor: '#ffffff' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
