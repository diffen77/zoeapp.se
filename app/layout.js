import './globals.css';

export const metadata = {
  title: 'Zoe — AI-Powered Mood & Wellness Tracking',
  description: 'Track your mood, discover patterns, and improve your wellness with AI insights.',
  keywords: 'mood tracking, wellness, AI, mental health',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* GA4 Tracking */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </script>
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
