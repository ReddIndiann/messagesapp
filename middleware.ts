
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    (pathname === "/" || pathname === "/auth/signup") &&
    request.cookies.has("signInResponse")
  )

    return NextResponse.redirect(new URL("/Sms/Home", request.url));

  if (
    (pathname === "/Sms/Home" || pathname === "/Sms/SendMessage") &&
    !request.cookies.has("signInResponse")
  )
  
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/Sms/Home", "/", "/auth/signup"],
};

