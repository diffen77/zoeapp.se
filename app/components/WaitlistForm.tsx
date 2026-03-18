'use client'

import { useState } from 'react'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate input
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(data.message || 'Failed to subscribe. Please try again.')
        return
      }

      setStatus('success')
      setMessage('Thank you! Check your email for confirmation.')
      setEmail('')

      // Track GA4 event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          form_name: 'waitlist',
        })
      }

      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      console.error('Waitlist form error:', error)
      setStatus('error')
      setMessage('An error occurred. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="waitlist-form">
      <div className="form-group">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="form-input"
          aria-label="Email address"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`form-button ${status === 'loading' ? 'loading' : ''}`}
        >
          {status === 'loading' ? 'Subscribing...' : 'Join Waitlist'}
        </button>
      </div>

      {message && (
        <div className={`form-message form-message-${status}`}>
          {message}
        </div>
      )}
    </form>
  )
}
