"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

interface RelatedProjectsProps {
  currentProjectId: string
  category: string
}

// Mock related projects - in a real app, this would come from an API
const allProjects = [
  {
    id: "2",
    title: "Digital Banking Workflow Engine",
    slug: "digital-banking-workflow-engine",
    description: "Automated KYC and onboarding system for Mashreq Bank reducing processing time by 80%",
    tags: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    category: "Finance",
    image: "/placeholder.svg?height=200&width=300",
    githubUrl: "https://github.com/ahadiwasti/banking-workflow",
    liveUrl: "https://banking-demo.vercel.app",
  },
  {
    id: "3",
    title: "Cloud-Native Microservices Platform",
    slug: "cloud-native-microservices-platform",
    description: "Scalable microservices platform with auto-scaling, service mesh, and observability built with Golang",
    tags: ["Golang", "Kubernetes", "Docker", "Istio"],
    category: "Infrastructure",
    image: "/placeholder.svg?height=200&width=300",
    githubUrl: "https://github.com/ahadiwasti/microservices-platform",
    liveUrl: "https://microservices-demo.vercel.app",
  },
  {
    id: "4",
    title: "Real-Time Analytics Dashboard",
    slug: "real-time-analytics-dashboard",
    description: "High-performance analytics platform processing 1TB+ data daily with real-time visualizations",
    tags: ["React", "D3.js", "WebSocket", "ClickHouse"],
    category: "Analytics",
    image: "/placeholder.svg?height=200&width=300",
    githubUrl: "https://github.com/ahadiwasti/analytics-dashboard",
    liveUrl: "https://analytics-demo.vercel.app",
  },
]

export function RelatedProjects({ currentProjectId, category }: RelatedProjectsProps) {
  const [relatedProjects, setRelatedProjects] = useState<typeof allProjects>([])

  useEffect(() => {
    // Filter out current project and get related ones
    const filtered = allProjects.filter((project) => project.id !== currentProjectId).slice(0, 3)

    setRelatedProjects(filtered)
  }, [currentProjectId, category])

  if (relatedProjects.length === 0) {
    return null
  }

  return (
    <section className="container px-4 md:px-6 py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-all group-hover:scale-105"
                  />
                </div>
              </Link>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                <Link href={`/projects/${project.slug}`}>
                  <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </CardTitle>
                </Link>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild className="flex-1">
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1">
                    <Link href={`/projects/${project.slug}`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
