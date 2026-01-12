import Link from 'next/link';
import type { Metadata } from 'next'
import { Tajawal, Inter, Playfair_Display } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const tajawal = Tajawal({
    weight: ['200', '300', '400', '500', '700', '800', '900'],
    subsets: ['arabic'],
    variable: '--font-tajawal',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'جامعة بغداد الجديدة',
    description: 'موقع جامعة بغداد الجديدة الرسمي',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ar" dir="rtl" className={`${inter.variable} ${tajawal.variable} ${playfair.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

