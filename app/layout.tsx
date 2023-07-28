import { AppProvider } from '@/lib/store/appProvider'
import './globals.css'
import './style.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'WMS Warehouse',
    description: 'Warehouse Management Redefined.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppProvider>
                    <div className="w-full h-screen">
                        {children}
                    </div>
                </AppProvider>
            </body>
        </html>
    )
}
