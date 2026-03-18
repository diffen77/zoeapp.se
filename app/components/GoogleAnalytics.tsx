'use client'

import Script from 'next/script'
import { useEffect } from 'react'

// Google Analytics 4 Measurement ID
// Replace with your actual GA4 Measurement ID (e.g., G-XXXXXXXXXX)
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-PLACEHOLDER'

export function GoogleAnalytics() {
  useEffect(() => {
    // Track page view on component mount
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
      })
    }
  }, [])

  // Expose event tracking function to window for use in HTML elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).trackEvent = (eventName: string, eventData?: Record<string, any>) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', eventName, eventData || {})
        }
      }
    }
  }, [])

  return (
    <>
      {/* Google Analytics 4 Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}', {
              'page_path': window.location.pathname,
              'send_page_view': true,
              'anonymize_ip': true,
              'allow_google_signals': false
            });
          `,
        }}
      />
    </>
  )
}
