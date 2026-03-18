import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Get or create waitlist data file
function getWaitlistPath(): string {
  return path.join(process.cwd(), 'data', 'waitlist.json')
}

// Ensure data directory exists
function ensureDataDir(): void {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read waitlist from file
function readWaitlist(): Array<{ email: string; timestamp: string }> {
  try {
    const waitlistPath = getWaitlistPath()
    if (fs.existsSync(waitlistPath)) {
      const data = fs.readFileSync(waitlistPath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading waitlist:', error)
  }
  return []
}

// Write waitlist to file
function writeWaitlist(waitlist: Array<{ email: string; timestamp: string }>): void {
  try {
    ensureDataDir()
    const waitlistPath = getWaitlistPath()
    fs.writeFileSync(waitlistPath, JSON.stringify(waitlist, null, 2))
  } catch (error) {
    console.error('Error writing waitlist:', error)
    throw new Error('Failed to save email')
  }
}

// Send confirmation email (placeholder for real email service)
async function sendConfirmationEmail(email: string): Promise<void> {
  // TODO: Integrate with Resend, SendGrid, or Nodemailer
  // For now, just log the action
  console.log(`[WAITLIST] Confirmation email would be sent to: ${email}`)

  // Example using Resend (uncomment when API key is available):
  // const { Resend } = require('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'noreply@zoeapp.se',
  //   to: email,
  //   subject: 'Welcome to Zoe Waitlist!',
  //   html: `<p>Thank you for joining the Zoe waitlist. We'll notify you when we launch!</p>`
  // });
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

    // Validate email
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

    // Read current waitlist
    const waitlist = readWaitlist()

    // Check if email already exists
    const emailExists = waitlist.some((entry) => entry.email === trimmedEmail)
    if (emailExists) {
      return NextResponse.json(
        { message: 'This email is already on the waitlist' },
        { status: 409 }
      )
    }

    // Add email to waitlist
    const newEntry = {
      email: trimmedEmail,
      timestamp: new Date().toISOString(),
    }

    waitlist.push(newEntry)

    // Write updated waitlist
    writeWaitlist(waitlist)

    // Send confirmation email
    try {
      await sendConfirmationEmail(trimmedEmail)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Log error but don't fail the request
      // The email was still saved to the waitlist
    }

    // Track event in GA4 if available
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

// GET endpoint to check waitlist status (admin only in production)
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin credentials here
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const waitlist = readWaitlist()
    return NextResponse.json({
      count: waitlist.length,
      entries: waitlist,
    })
  } catch (error) {
    console.error('Waitlist GET error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
