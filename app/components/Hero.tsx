'use client'

import '../styles/hero.css'

interface HeroProps {
  onCTAClick?: (action: string) => void
}

export function Hero({ onCTAClick }: HeroProps) {
  const handlePrimaryClick = () => {
    onCTAClick?.('hero_download')
    const downloadSection = document.getElementById('download')
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSecondaryClick = () => {
    onCTAClick?.('hero_learn_more')
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="hero-title">Elevate Your Health</h1>
        <p className="hero-subtitle">
          AI-powered ingredient scanning reveals what your body truly needs. 
          Make smarter food choices, feel better, live longer.
        </p>

        <div className="hero-ctas">
          <button
            className="btn btn-primary"
            onClick={handlePrimaryClick}
            aria-label="Download Zoe app"
          >
            Download Now
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleSecondaryClick}
            aria-label="Learn more about features"
          >
            Learn More
          </button>
        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <span className="hero-feature-icon">📱</span>
            <span className="hero-feature-text">iOS, Android, Web</span>
          </div>
          <div className="hero-feature">
            <span className="hero-feature-icon">🔒</span>
            <span className="hero-feature-text">End-to-end encrypted</span>
          </div>
          <div className="hero-feature">
            <span className="hero-feature-icon">⚡</span>
            <span className="hero-feature-text">Real-time insights</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-phone">
          <div className="phone-screen">
            <div className="phone-content">
              <div className="phone-header">Zoe</div>
              <div className="phone-graph">
                <div className="graph-bar" style={{ height: '60%' }}></div>
                <div className="graph-bar" style={{ height: '75%' }}></div>
                <div className="graph-bar" style={{ height: '50%' }}></div>
              </div>
              <div className="phone-text">Your nutrition</div>
              <div className="phone-score">95/100</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
