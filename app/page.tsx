'use client'

import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { HowItWorks } from './components/HowItWorks'
import { Metrics } from './components/Metrics'
import { Testimonials } from './components/Testimonials'
import { WaitlistForm } from './components/WaitlistForm'
import './page.css'

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventData || {})
    }
  }

  const handleCtaClick = (ctaName: string) => {
    trackEvent('cta_click', { cta_name: ctaName })
  }

  const handleFaqToggle = (question: string) => {
    trackEvent('faq_toggle', { question: question })
  }

  const faqItems = [
    {
      question: 'How accurate is the food tracking?',
      answer: 'Zoe uses advanced AI to analyze food images with 95%+ accuracy. Our system recognizes portion sizes, ingredients, and preparation methods.'
    },
    {
      question: 'Is my data private?',
      answer: 'Yes. All data is encrypted end-to-end. We never sell your information. Your food scans are only used to improve your personal insights.'
    },
    {
      question: 'How long until I see results?',
      answer: 'Most users see meaningful insights within 2-3 weeks of consistent tracking. The more data you provide, the more accurate your personalized recommendations become.'
    },
    {
      question: 'Can I use Zoe offline?',
      answer: 'Yes! Zoe works offline. Your scans are cached locally and synced when you have internet connection again.'
    }
  ]

  return (
    <div className="container">
      {/* 1. Navigation Component */}
      <Navigation />

      {/* 2. Hero Section Component */}
      <Hero onCTAClick={handleCtaClick} />

      {/* 3. Features Section Component */}
      <Features />

      {/* 4. How It Works Section Component */}
      <HowItWorks />

      {/* 5. Track Metrics Section Component */}
      <Metrics />

      {/* 6. Testimonials Section Component */}
      <Testimonials />

      {/* 7. FAQ Section */}
      <section id="faq" className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqItems.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => {
                  toggleFAQ(idx);
                  handleFaqToggle(item.question);
                }}
              >
                <span>{item.question}</span>
                <span className={`faq-icon ${openFAQ === idx ? 'open' : ''}`}>
                  ▼
                </span>
              </button>
              {openFAQ === idx && (
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA Footer Section */}
      <section id="download" className="cta-footer">
        <h2>Ready to Understand Your Food?</h2>
        <p>Download Zoe today and get instant nutritional insights with every meal.</p>
        
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--mint-veil)' }}>
            Join our waitlist for early access and exclusive updates.
          </p>
          <WaitlistForm />
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <button className="btn btn-primary btn-large" onClick={() => handleCtaClick('footer_download')}>
            Download Now
          </button>
          <div className="cta-links">
            <a href="itms-apps://apps.apple.com/app/zoe-nutrition/id6479821234" className="cta-link" onClick={() => handleCtaClick('download_ios')} rel="noopener noreferrer">iOS</a>
            <a href="https://play.google.com/store/apps/details?id=com.zoe.nutrition" className="cta-link" onClick={() => handleCtaClick('download_android')} target="_blank" rel="noopener noreferrer">Android</a>
            <a href="https://zoeapp.se" className="cta-link" onClick={() => handleCtaClick('download_web')}>Web</a>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Zoe</h4>
            <p>AI-powered food intelligence for better nutrition.</p>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Zoe. All rights reserved. | Made with care for better nutrition.</p>
        </div>
      </footer>
    </div>
  )
}
