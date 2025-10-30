import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Office Clue Game',
  description: 'Interactive office background with clickable hotspots',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

