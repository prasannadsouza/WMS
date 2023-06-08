import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WMS Warehouse',
  description: 'Warehouse Management Redefined.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
