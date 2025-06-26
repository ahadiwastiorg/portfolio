import { NextResponse } from "next/server"

const mockCategories = [
  { id: "all", name: "All", count: 45 },
  { id: "technology", name: "Technology", count: 18 },
  { id: "electronics", name: "Electronics", count: 12 },
  { id: "programming", name: "Programming", count: 15 },
  { id: "web-development", name: "Web Development", count: 20 },
  { id: "mobile", name: "Mobile Development", count: 8 },
  { id: "devops", name: "DevOps", count: 10 },
  { id: "cloud", name: "Cloud Computing", count: 14 },
]

export async function GET() {
  return NextResponse.json(mockCategories)
}
