"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Star,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { AnalyticsService } from "@/services/external/analytics-service"
import { useEffect, useState } from "react"

interface ProjectDetailProps {
  project: {
    id: string
    title: string
    slug: string
    description: string
    longDescription: string
    tags: string[]
    technologies: string[]
    category: string
    image: string
    images: string[]
    githubUrl: string
    liveUrl?: string
    featured: boolean
    status: "completed" | "in-progress" | "planned"
    metrics?: Record<string, string>
    highlights: string[]
    challenges: string[]
    solutions: string[]
    createdAt: string
    updatedAt: string
  }
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Track project view
    AnalyticsService.trackProjectView(project.id, project.title)
  }, [project])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <article className="container px-4 md:px-6 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline">{project.category}</Badge>
                {project.featured && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">Featured Project</span>
                  </div>
                )}
                <Badge variant={project.status === "completed" ? "default" : "secondary"} className="capitalize">
                  {project.status.replace("-", " ")}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{project.title}</h1>

              <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Completed {new Date(project.updatedAt).getFullYear()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <Button asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                </Button>
                {project.liveUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                <Button variant="outline" onClick={handleShare}>
                  Share Project
                </Button>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project Images */}
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg border">
              <img
                src={project.images[currentImageIndex] || project.image}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="h-full w-full object-cover"
              />
            </div>

            {project.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-12 rounded border-2 overflow-hidden ${
                      currentImageIndex === index ? "border-primary" : "border-muted"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid gap-4 md:grid-cols-4 mb-12">
            {Object.entries(project.metrics).map(([key, value]) => (
              <Card key={key}>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">{value}</div>
                  <div className="text-sm text-muted-foreground capitalize">{key.replace("_", " ")}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Detailed Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="solutions">Solutions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>{project.longDescription}</p>

                  <h3>Key Features</h3>
                  <ul>
                    {project.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>

                  <h3>Technical Architecture</h3>
                  <p>
                    This project leverages modern technologies including {project.technologies.slice(0, 3).join(", ")}
                    to deliver a scalable and maintainable solution. The architecture follows industry best practices
                    for performance, security, and reliability.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="highlights" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Key Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Technical Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="solutions" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Solutions & Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.solutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{solution}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </article>
  )
}
