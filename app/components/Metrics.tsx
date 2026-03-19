'use client'

import '../styles/metrics.css'

interface MetricItem {
  label: string
  icon: string
}

const metrics: MetricItem[] = [
  { label: 'Calories', icon: '🔥' },
  { label: 'Carbs', icon: '🌾' },
  { label: 'Protein', icon: '💪' },
  { label: 'Fat', icon: '🥑' },
  { label: 'Fiber', icon: '🥦' },
  { label: 'Sodium', icon: '🧂' },
  { label: 'Sugar', icon: '🍯' },
  { label: 'Water', icon: '💧' },
  { label: 'Steps', icon: '👟' },
  { label: 'Sleep', icon: '😴' },
  { label: 'Mood', icon: '😊' },
  { label: 'Energy', icon: '⚡' },
]

export function Metrics() {
  return (
    <section id="metrics" className="metrics">
      <div className="metrics-container">
        <div className="metrics-header">
          <h2 className="metrics-title">Track What Matters</h2>
          <p className="metrics-subtitle">
            Zoe monitors 12+ nutritional dimensions to give you a complete picture of your health
          </p>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric, idx) => (
            <div key={idx} className="metric-badge">
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="metrics-footer">
          <p className="metrics-footer-text">
            Every metric is personalized to your body and goals. Zoe learns what matters most to you.
          </p>
        </div>
      </div>
    </section>
  )
}
