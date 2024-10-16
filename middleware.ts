import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected and public routes
const protectedRoutes = [
  // SMS Section
  "/Sms/Home", 
  "/Sms/SendMessage", 
  "/Sms/Contacts", 
  "/Sms/Wallet", 
  "/Sms/CampaignHistory",

  // Voice Section
  "/Voice/VoiceHome", 
  "/Voice/Sendcall", 
  "/Voice/VoiceContacts", 
  "/Voice/VoiceWallet", 
  "/Voice/VoiceHistory",

  // Admin Section
  "/Admin/Dashboard", 
  "/Admin/ManageUsers", 
  "/Admin/SenderIds", 
  "/Admin/PackagesCreation", 
  "/Admin/ManageBundleUsage",

  // Help Section
  "/Help"
];

const publicRoutes = ["/", "/auth/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from public routes
  if (publicRoutes.includes(pathname) && request.cookies.has("signInResponse")) {
    return NextResponse.redirect(new URL("/Sms/Home", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.includes(pathname) && !request.cookies.has("signInResponse")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue to the requested page if no conditions are met
  return NextResponse.next();
}

// Matcher configuration to apply the middleware to specific routes
export const config = {
  matcher: [
    "/Sms/Home",
    "/Sms/SendMessage",
    "/Sms/Contacts",
    "/Sms/Wallet",
    "/Sms/CampaignHistory",

    "/Voice/VoiceHome",
    "/Voice/Sendcall",
    "/Voice/VoiceContacts",
    "/Voice/VoiceWallet",
    "/Voice/VoiceHistory",

    "/Admin/Dashboard",
    "/Admin/ManageUsers",
    "/Admin/SenderIds",
    "/Admin/PackagesCreation",
    "/Admin/ManageBundleUsage",

    "/Help",
    "/",
    "/auth/signup"
  ]
};
