'use client'

import { useState } from 'react'
import '../styles/navigation.css'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogoClick = () => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {/* Logo */}
        <button
          className="nav-logo"
          onClick={handleLogoClick}
          aria-label="Zoe Home"
          tabIndex={0}
        >
          🍎 Zoe
        </button>

        {/* Desktop Nav Links */}
        <ul className="nav-links" role="menubar">
          {navLinks.map((link) => (
            <li key={link.id} role="none">
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.id)
                }}
                role="menuitem"
                tabIndex={0}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li role="none">
            <a
              href="#download"
              className="nav-cta"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('download')
              }}
              role="menuitem"
              tabIndex={0}
            >
              Download
            </a>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
          tabIndex={0}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" id="mobile-menu" role="menu">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="mobile-menu-item"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(link.id)
              }}
              role="menuitem"
              tabIndex={0}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            className="mobile-menu-item mobile-cta"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('download')
            }}
            role="menuitem"
            tabIndex={0}
          >
            Download
          </a>
        </div>
      )}
    </nav>
  )
}
