'use client';

import { useState } from 'react';

/**
 * FAQ Section — Zoe Landing Page
 */

const faqs = [
  {
    id: 1,
    question: 'Is my mood data private?',
    answer:
      'Yes. All your data is encrypted end-to-end. We never sell or share your personal information.',
  },
  {
    id: 2,
    question: 'How often should I log my mood?',
    answer:
      'Daily logging is ideal for best AI insights. But even a few logs per week helps you discover patterns.',
  },
  {
    id: 3,
    question: 'Which wearables are supported?',
    answer:
      'Zoe supports Apple Watch, Fitbit, Oura Ring, and Garmin devices. More integrations coming soon.',
  },
  {
    id: 4,
    question: 'Is there a free version?',
    answer:
      'Yes! Free version includes basic mood tracking. Premium unlocks AI insights and wearable integration.',
  },
  {
    id: 5,
    question: 'Can I export my data?',
    answer: 'Absolutely. You can export all your data as CSV anytime from account settings.',
  },
  {
    id: 6,
    question: 'What if I miss logging a day?',
    answer:
      'No problem! Log whenever you remember. Our AI is trained to handle sporadic data.',
  },
];

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-mint/20 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start gap-4 hover:text-sage transition-colors text-left"
      >
        <span className="text-lg font-playfair font-bold text-sage pr-4">{faq.question}</span>
        <span className="text-2xl text-mint flex-shrink-0">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <p className="mt-4 text-gray-600 font-inter pl-4">{faq.answer}</p>}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-peach/5 to-mint/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-sage mb-16">
          FAQ
        </h2>
        <div className="space-y-0">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
