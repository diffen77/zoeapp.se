import { NextRequest, NextResponse } from 'next/server'

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    // Validate request
    if (request.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method not allowed' },
        { status: 405 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { email } = body

    // Validate email client-side first
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    const trimmedEmail = email.trim().toLowerCase()

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Proxy to zoe-api backend
    const apiUrl = process.env.NEXT_PUBLIC_ZOE_API_URL || 'http://localhost:3001'
    const response = await fetch(`${apiUrl}/api/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: trimmedEmail }),
    })

    // Handle backend response
    const data = await response.json()

    if (!response.ok) {
      // Return backend error status and message
      return NextResponse.json(
        { message: data.message || 'Failed to add email to waitlist' },
        { status: response.status }
      )
    }

    // Track GA4 event on success
    console.log(`[WAITLIST] New signup: ${trimmedEmail}`)

    return NextResponse.json(
      {
        message: 'Successfully added to waitlist',
        email: trimmedEmail,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
