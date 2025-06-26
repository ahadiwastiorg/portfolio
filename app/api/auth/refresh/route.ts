import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const refreshSchema = z.object({
  refreshToken: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { refreshToken } = refreshSchema.parse(body)

    // Mock token refresh logic
    if (refreshToken === "mock-refresh-token") {
      return NextResponse.json({
        token: "new-mock-jwt-token",
        refreshToken: "new-mock-refresh-token",
        expiresIn: 3600,
      })
    }

    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
