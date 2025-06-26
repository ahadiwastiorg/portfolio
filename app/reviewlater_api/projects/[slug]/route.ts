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
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const project = mockProjects.find((p) => p.id === params.id)
    console.log("Fetching project with ID:", params.id)
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  return NextResponse.json(project)
}
