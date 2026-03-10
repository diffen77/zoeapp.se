import { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest, event: NextFetchEvent) {
  // Skip middleware for login and auth routes
  if (request.nextUrl.pathname.startsWith('/login') || 
      request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Check for mc_session cookie
  const cookie = request.cookies.get('mc_session');
  
  if (!cookie || cookie.value !== process.env.DASHBOARD_PASSWORD) {
    // Redirect to login if cookie is missing or incorrect
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Allow access if cookie is correct
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /login
     * - /api/auth
     */
    '/((?!login|api/auth).*)',
  ],
};
