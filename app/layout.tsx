import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(`https://ryan.fan`),
  title: 'Ryan Fan',
  description: 'Ryan Fan is a New York based Product Designer helping humans understand machines better.',
  keywords: 'senior product designer, product designer in new york',
  robots: 'index, follow',
  openGraph: {
    title: 'Ryan Fan',
    description: 'Ryan Fan is a New York based Product Designer helping humans understand machines better.',
    url: 'https://ryan.fan',
    siteName: 'Ryan Fan',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/img/og_img.jpg',
        width: '350',
        height: '350',
        alt: 'SMILE',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/gug7byo.css" />
        </head>
      <body className="font-sans tracking-normal overflow-x-hidden">{children}</body>
      <GoogleAnalytics gaId="G-6X2QLFES8E" />
    </html>
  )
}
