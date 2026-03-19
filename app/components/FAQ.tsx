'use client'

import { useState } from 'react'
import '../styles/faq.css'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'How accurate is the food tracking?',
    answer: 'Zoe uses advanced AI to analyze food images with 95%+ accuracy. Our system recognizes portion sizes, ingredients, and preparation methods with precision that improves over time as it learns your eating patterns.',
  },
  {
    question: 'Is my data private?',
    answer: 'Yes. All data is encrypted end-to-end. We never sell your information. Your food scans are only used to improve your personal insights and recommendations. Your privacy is our priority.',
  },
  {
    question: 'How long until I see results?',
    answer: 'Most users see meaningful insights within 2-3 weeks of consistent tracking. The more data you provide, the more accurate your personalized recommendations become. Progress compounds over time.',
  },
  {
    question: 'Can I use Zoe offline?',
    answer: 'Yes! Zoe works offline. Your scans are cached locally and synced when you have internet connection again. You never lose data, even without connectivity.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleAccordion(index)
    }
  }

  return (
    <section id="faq" className="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about Zoe
          </p>
        </div>

        <div className="faq-accordion">
          {faqItems.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className={`faq-question ${openIndex === idx ? 'open' : ''}`}
                onClick={() => toggleAccordion(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="faq-question-text">{item.question}</span>
                <div className="faq-chevron">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
              <div
                id={`faq-answer-${idx}`}
                className={`faq-answer ${openIndex === idx ? 'open' : ''}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
              >
                <div className="faq-answer-content">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
