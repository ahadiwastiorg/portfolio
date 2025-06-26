import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword } = registerSchema.parse(body)

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    // Mock registration logic
    const user = {
      id: Date.now().toString(),
      email,
      name,
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const token = "mock-jwt-token"
    const refreshToken = "mock-refresh-token"
    const expiresIn = 3600 // 1 hour

    return NextResponse.json({
      user,
      token,
      refreshToken,
      expiresIn,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
