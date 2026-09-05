import { Inter } from 'next/font/google'
import { SiteFooter } from '@/components/footer'
import { PrivateHeader } from '@/components/private-header'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body>
        <div className="min-h-screen">
          <PrivateHeader />
          <div className="mt-16">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
