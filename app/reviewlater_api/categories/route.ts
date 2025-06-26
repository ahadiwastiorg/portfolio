import { NextResponse } from "next/server"

const MOCK_CATEGORIES = [
  {
    id: "frontend",
    name: "Frontend Development",
    slug: "frontend-development",
    description: "Learn modern frontend technologies like React, Vue, and Angular",
    icon: "💻",
    coursesCount: 12,
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "backend",
    name: "Backend Development",
    slug: "backend-development",
    description: "Master server-side development with Node.js, Python, and more",
    icon: "⚙️",
    coursesCount: 8,
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "languages",
    name: "Programming Languages",
    slug: "programming-languages",
    description: "Learn popular programming languages from scratch",
    icon: "🔤",
    coursesCount: 15,
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "mobile",
    name: "Mobile Development",
    slug: "mobile-development",
    description: "Build mobile apps for iOS and Android",
    icon: "📱",
    coursesCount: 6,
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      categories: MOCK_CATEGORIES,
      total: MOCK_CATEGORIES.length,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
