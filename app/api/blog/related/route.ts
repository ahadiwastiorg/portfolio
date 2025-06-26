import { type NextRequest, NextResponse } from "next/server"

const mockBlogPosts = [
  // Same mock data as above...
  {
    id: "1",
    title: "Building Scalable Microservices with Golang",
    slug: "building-scalable-microservices-golang",
    excerpt:
      "Learn how to design and implement microservices architecture using Golang, Docker, and Kubernetes for maximum scalability.",
    tags: ["golang", "microservices", "docker", "kubernetes", "technology"],
    category: "technology",
    // ... other fields
  },
  // Add more posts...
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const exclude = searchParams.get("exclude")
  const tags = searchParams.getAll("tags")
  const limit = Number.parseInt(searchParams.get("limit") || "3")

  let relatedPosts = mockBlogPosts.filter((post) => post.id !== exclude)

  // Find posts with matching tags
  if (tags.length > 0) {
    relatedPosts = relatedPosts
      .map((post) => ({
        ...post,
        matchingTags: post.tags.filter((tag) => tags.includes(tag)).length,
      }))
      .filter((post) => post.matchingTags > 0)
      .sort((a, b) => b.matchingTags - a.matchingTags)
  }

  // Limit results
  relatedPosts = relatedPosts.slice(0, limit)

  return NextResponse.json(relatedPosts)
}
