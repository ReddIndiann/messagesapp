import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';
// Middleware to check for authentication
export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const signInResponse = cookies.get('signInResponse');
  const url = new URL(request.url);

  // Redirect to the login page if no cookie is found and the requested path is '/Sms/Home'
  if (!signInResponse && url.pathname.startsWith('/Sms/Home')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed if cookie is present
  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ['/Sms/Home/:path*'], // Adjust this pattern to match your protected routes
};
