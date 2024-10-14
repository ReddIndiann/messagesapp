import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If user is authenticated and tries to access sign-up or home page, redirect to "/Sms/Home"
  if ((pathname === "/" || pathname === "/auth/signup") && request.cookies.has("signInResponse")) {
    return NextResponse.redirect(new URL("/Sms/Home", request.url));
  }

  // If user is not authenticated and tries to access protected routes, redirect to "/"
  if ((pathname === "/Sms/Home" || pathname === "/Sms/SendMessage") && !request.cookies.has("signInResponse")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue to the requested page if conditions are not met
  return NextResponse.next();
}

// Matcher configuration to apply the middleware to specific routes
export const config = {
  matcher: ["/Sms/Home", "/Sms/SendMessage", "/", "/auth/signup"],
};
