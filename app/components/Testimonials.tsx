'use client'

import '../styles/testimonials.css'

interface Testimonial {
  quote: string
  author: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Zoe completely transformed how I think about food. I finally understand what my body actually needs to thrive.',
    author: 'Sarah M.',
    role: 'Nutrition Coach',
  },
  {
    quote: 'The AI accuracy is mind-blowing. It knows my food better than I do. This is a game-changer for my fitness journey.',
    author: 'Marcus T.',
    role: 'Fitness Enthusiast',
  },
  {
    quote: 'Simple, beautiful, and genuinely helpful. Zoe makes healthy eating feel effortless. This is the future of nutrition.',
    author: 'Emma K.',
    role: 'Health Writer',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Users Say</h2>
          <p className="testimonials-subtitle">
            Join thousands discovering their best selves with Zoe
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author-section">
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
