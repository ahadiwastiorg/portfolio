import { type NextRequest, NextResponse } from "next/server"

const mockProjects = [
  {
    id: "1",
    title: "Telecom Management System",
    description: "Enterprise-level telecom management platform built with React and Node.js",
    longDescription:
      "A comprehensive telecom management system that handles customer management, billing, and service provisioning.",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    category: "Enterprise",
    image: "/placeholder.svg?height=200&width=300",
    images: ["/placeholder.svg?height=400&width=600"],
    githubUrl: "https://github.com/example/telecom-system",
    liveUrl: "https://telecom-demo.example.com",
    featured: true,
    status: "completed" as const,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Banking Workflow Automation",
    description: "Digital onboarding process automation for Mashreq Bank",
    longDescription: "Automated workflow system for digital customer onboarding with KYC integration.",
    tags: ["Vue.js", "Express", "MySQL", "Docker"],
    technologies: ["Vue.js", "Express", "MySQL", "Docker", "Jenkins"],
    category: "Finance",
    image: "/placeholder.svg?height=200&width=300",
    images: ["/placeholder.svg?height=400&width=600"],
    githubUrl: "https://github.com/example/banking-workflow",
    featured: true,
    status: "completed" as const,
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Microservices Platform",
    description: "Scalable microservices architecture with Golang and Docker",
    longDescription: "A complete microservices platform with service discovery, load balancing, and monitoring.",
    tags: ["Golang", "Docker", "Kubernetes", "etcd"],
    technologies: ["Golang", "Docker", "Kubernetes", "etcd", "Prometheus"],
    category: "Infrastructure",
    image: "/placeholder.svg?height=200&width=300",
    images: ["/placeholder.svg?height=400&width=600"],
    githubUrl: "https://github.com/example/microservices-platform",
    featured: true,
    status: "completed" as const,
    createdAt: "2024-01-03T00:00:00.000Z",
    updatedAt: "2024-01-03T00:00:00.000Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const featured = searchParams.get("featured")
  const technology = searchParams.get("technology")
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let filteredProjects = [...mockProjects]

  // Apply filters
  if (featured === "true") {
    filteredProjects = filteredProjects.filter((p) => p.featured)
  }

  if (technology) {
    filteredProjects = filteredProjects.filter((p) => p.technologies.includes(technology))
  }

  if (category) {
    filteredProjects = filteredProjects.filter((p) => p.category === category)
  }

  if (search) {
    filteredProjects = filteredProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

  return NextResponse.json({
    projects: paginatedProjects,
    total: filteredProjects.length,
    hasMore: endIndex < filteredProjects.length,
  })
}
