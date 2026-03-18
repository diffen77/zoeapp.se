'use client'

import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
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

  const metrics = [
    'Carbohydrates', 'Protein', 'Fat', 'Fiber',
    'Sodium', 'Sugar', 'Vitamins', 'Minerals',
    'Antioxidants', 'Probiotics', 'NOVA Score', 'Satiety'
  ]

  const testimonials = [
    {
      quote: 'Zoe completely changed how I think about food. I finally understand what my body actually needs.',
      author: 'Sarah M.',
      role: 'Nutrition Coach'
    },
    {
      quote: 'The AI is scary-accurate. It knows my food better than I do. Highly recommended!',
      author: 'Marcus T.',
      role: 'Fitness Enthusiast'
    },
    {
      quote: 'Simple, beautiful, and genuinely helpful. This is the future of nutrition tracking.',
      author: 'Emma K.',
      role: 'Health Writer'
    }
  ]

  return (
    <div className="container">
      {/* 1. Navigation Component */}
      <Navigation />

      {/* 2. Hero Section Component */}
      <Hero onCTAClick={handleCtaClick} />

      {/* 3. Features Section */}
      <section id="features" className="features">
        <h2>Why Choose Zoe?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Tracking</h3>
            <p>Snap a photo. Get instant insights. No manual logging, no guessing. AI does the heavy lifting.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Deep Insights</h3>
            <p>Beyond calories. Understand carbs, protein, fiber, NOVA score, and 12+ nutritional metrics per meal.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>End-to-end encrypted. Your food data is yours alone. We never sell or share your personal information.</p>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker">1</div>
            <h3>Snap Photo</h3>
            <p>Point your phone at your meal. One photo captures everything.</p>
          </div>
          <div className="timeline-connector"></div>
          <div className="timeline-item">
            <div className="timeline-marker">2</div>
            <h3>AI Analysis</h3>
            <p>Our AI instantly identifies ingredients, portions, and preparation method.</p>
          </div>
          <div className="timeline-connector"></div>
          <div className="timeline-item">
            <div className="timeline-marker">3</div>
            <h3>Get Insights</h3>
            <p>View 12+ nutritional metrics, NOVA score, and personalized recommendations.</p>
          </div>
          <div className="timeline-connector"></div>
          <div className="timeline-item">
            <div className="timeline-marker">4</div>
            <h3>Track & Improve</h3>
            <p>Build better habits. See patterns. Make smarter food choices every day.</p>
          </div>
        </div>
      </section>

      {/* 5. Track Metrics Section */}
      <section className="metrics">
        <h2>Track What Matters</h2>
        <p className="metrics-intro">Zoe monitors 12+ nutritional dimensions to give you a complete picture of your diet.</p>
        <div className="metrics-grid">
          {metrics.map((metric, idx) => (
            <div key={idx} className="metric-badge">
              {metric}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="testimonials">
        <h2>What Users Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-card">
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <p className="testimonial-author">{testimonial.author}</p>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

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
