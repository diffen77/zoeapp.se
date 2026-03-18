import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zoe — Understand Your Food | AI Nutrition Tracking',
  description: 'AI-powered ingredient scanning reveals what your body truly needs. Track nutrition with instant AI analysis. Download Zoe for iOS, Android, and Web.',
  applicationName: 'Zoe',
  keywords: ['nutrition tracking', 'food scanner', 'AI nutrition', 'calorie tracker', 'macro tracking', 'health app'],
  authors: [{ name: 'Zoe Team' }],
  creator: 'Zoe',
  publisher: 'Zoe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zoeapp.se',
    siteName: 'Zoe',
    title: 'Zoe — Understand Your Food | AI Nutrition Tracking',
    description: 'AI-powered ingredient scanning reveals what your body truly needs. Make smarter food choices with Zoe.',
    images: [
      {
        url: 'https://zoeapp.se/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zoe — Understand Your Food',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoe — Understand Your Food',
    description: 'AI-powered ingredient scanning reveals what your body truly needs.',
    images: ['https://zoeapp.se/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '🍎',
  },
  verification: {
    google: 'verification-code-placeholder',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7A8C6E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
