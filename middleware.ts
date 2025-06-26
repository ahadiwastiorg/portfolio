import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard", "/admin", "/profile"]

// Define public routes that should redirect authenticated users
const publicRoutes = ["/login", "/register"]

// API routes that require authentication
const protectedApiRoutes = ["/api/user", ]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth_token")?.value ?? request.headers.get("authorization") ?? undefined

  // Log all requests in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`)
  }

  // Handle API routes
  if (pathname.startsWith("/api")) {
    return handleApiRoutes(request, pathname, token)
  }

  // Handle protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Handle public routes (redirect authenticated users)
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/dashboard"
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
  }

  // Add security headers
  const response = NextResponse.next()

  // Security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // CORS headers for API routes
  if (pathname.startsWith("/api")) {
    response.headers.set("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGINS || "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  }

  return response
}

function handleApiRoutes(request: NextRequest, pathname: string, token: string | undefined) {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGINS || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  }

  // Check authentication for protected API routes
  const isProtectedApiRoute = protectedApiRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedApiRoute && !token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Rate limiting (simple implementation)
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
  const rateLimitKey = `rate_limit_${ip}`

  // In a real app, you'd use Redis or a proper rate limiting service
  // This is a simplified example
  if (shouldRateLimit(rateLimitKey)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": "60" } })
  }

  return NextResponse.next()
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function shouldRateLimit(key: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 100 // 100 requests per minute

  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
