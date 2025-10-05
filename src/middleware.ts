import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login'];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  // Check for session cookie
  const sessionCookie = request.cookies.get('relay_session');
  const hasSession = !!sessionCookie?.value;
  
  // If accessing protected route without session, redirect to login
  if (!isPublicRoute && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If accessing login page with session, redirect to onboarding or inbox
  if (pathname === '/login' && hasSession) {
    const nextPath = request.nextUrl.searchParams.get('next');
    if (nextPath && nextPath.startsWith('/')) {
      return NextResponse.redirect(new URL(nextPath, request.url));
    }
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
