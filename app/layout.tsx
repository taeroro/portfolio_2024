import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ryan Fan',
  description: 'Ryan Fan is a New York based Product Designer helping humans understand machines better.',
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
    </html>
  )
}
