'use client'

import '../styles/features.css'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

const featureData: FeatureCardProps[] = [
  {
    icon: '🔍',
    title: 'Smart Tracking',
    description: 'Snap a photo. Get instant insights. No manual logging, no guessing. AI does the heavy lifting.',
  },
  {
    icon: '📊',
    title: 'Deep Insights',
    description:
      'Beyond calories. Understand carbs, protein, fiber, NOVA score, and 12+ nutritional metrics per meal.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description:
      'End-to-end encrypted. Your food data is yours alone. We never sell or share your personal information.',
  },
]

export function Features() {
  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Why Choose Zoe?</h2>
          <p className="features-subtitle">
            Everything you need for smarter nutrition decisions
          </p>
        </div>

        <div className="features-grid">
          {featureData.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-accent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
