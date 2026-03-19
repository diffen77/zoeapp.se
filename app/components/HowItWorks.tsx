'use client'

import '../styles/how-it-works.css'

interface TimelineStep {
  number: number
  title: string
  description: string
}

const steps: TimelineStep[] = [
  {
    number: 1,
    title: 'Download',
    description: 'Get Zoe on your phone. Works on iOS and Android. Set up takes less than 2 minutes.',
  },
  {
    number: 2,
    title: 'Setup',
    description: 'Create your profile. Link your health goals. Zoe learns your preferences.',
  },
  {
    number: 3,
    title: 'Track',
    description: 'Snap photos of what you eat. Our AI instantly analyzes ingredients and portions.',
  },
  {
    number: 4,
    title: 'Understand',
    description: 'See 12+ nutritional metrics, personalized recommendations, and patterns over time.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-container">
        <div className="how-header">
          <h2 className="how-title">How It Works</h2>
          <p className="how-subtitle">
            Get started in minutes, transform your nutrition in weeks
          </p>
        </div>

        <div className="timeline">
          {steps.map((step, idx) => (
            <div key={step.number} className="timeline-item">
              {/* Timeline Marker */}
              <div className="timeline-marker-wrapper">
                <div className="timeline-marker">{step.number}</div>
              </div>

              {/* Content */}
              <div className="timeline-content">
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-description">{step.description}</p>
              </div>

              {/* Connector Line (hidden on last item) */}
              {idx < steps.length - 1 && (
                <div className="timeline-connector" aria-hidden="true"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="how-cta">
          <p className="how-cta-text">Ready to transform your nutrition?</p>
          <a href="#download" className="how-cta-button">
            Download Zoe Now
          </a>
        </div>
      </div>
    </section>
  )
}
