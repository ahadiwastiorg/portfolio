import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional(),
})

// Hardcoded users for demo
const DEMO_USERS = {
  "demo@email.com": {
    id: "1",
    email: "demo@email.com",
    password: "1234",
    name: "Demo Admin",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  "student@demo.com": {
    id: "2",
    email: "student@demo.com",
    password: "student123",
    name: "Demo Student",
    role: "student",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subscription: {
      id: "sub_1",
      plan: "trial",
      status: "active",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days trial
      autoRenew: false,
    },
  },
}

export async function POST(request: NextRequest) {
  try {
    console.log("Received login request")
    const body = await request.json()
    const { email, password, rememberMe } = loginSchema.parse(body)
        console.log("Parsed login data:", { email, password, rememberMe })
    // Check demo users
    const user = DEMO_USERS[email as keyof typeof DEMO_USERS]
    console.log("Found user:", user ? user.email : "No user found")
    if (user && user.password === password) {
      console.log("User authenticated:", user.email)
      const { password: _, ...userWithoutPassword } = user

      const token = "mock-jwt-token-" + user.id
      const refreshToken = "mock-refresh-token-" + user.id
      const expiresIn = rememberMe ? 30 * 24 * 3600 : 24 * 3600 // 30 days or 1 day

      return NextResponse.json({
        user: userWithoutPassword,
        token,
        refreshToken,
        expiresIn,
      })
    }

    return NextResponse.json(
      { error: "Invalid credentials. Use 'demo' / '1234' for admin or 'student@demo.com' / 'student123' for student" },
      { status: 401 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
