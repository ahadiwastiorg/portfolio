import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ProjectDetail } from "@/components/projects/project-detail"
import { RelatedProjects } from "@/components/projects/related-projects"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

// This would normally come from your API/database
const projects = [
  {
    id: "1",
    title: "Enterprise Telecom Management Platform",
    slug: "enterprise-telecom-management-platform",
    description:
      "Comprehensive telecom management system handling 10M+ subscribers with real-time billing and service provisioning",
    longDescription:
      "A large-scale enterprise telecom management platform built for Axiom Telecommunication, handling over 10 million subscribers with real-time billing, service provisioning, and customer management. The system processes millions of transactions daily with 99.9% uptime.",
    tags: ["React", "Node.js", "MongoDB", "Redis", "AWS"],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "AWS",
      "Docker",
      "Kubernetes",
      "Microservices",
    ],
    category: "Enterprise",
    image: "/placeholder.svg?height=300&width=500",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    githubUrl: "https://github.com/ahadiwasti/telecom-platform",
    liveUrl: "https://telecom-demo.vercel.app",
    featured: true,
    status: "completed" as const,
    metrics: {
      users: "10M+",
      uptime: "99.9%",
      transactions: "5M/day",
      performance: "< 200ms",
    },
    highlights: [
      "Handles 10M+ active subscribers",
      "Processes 5M+ transactions daily",
      "99.9% uptime with auto-scaling",
      "Real-time billing and provisioning",
      "Multi-tenant architecture",
    ],
    challenges: [
      "Scaling to handle millions of concurrent users",
      "Real-time data synchronization across services",
      "Complex billing calculations and tax compliance",
      "High availability and disaster recovery",
    ],
    solutions: [
      "Implemented microservices architecture with Kubernetes",
      "Used Redis for caching and session management",
      "Built event-driven architecture with message queues",
      "Deployed across multiple AWS regions",
    ],
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  // Add other projects here...
]

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.title} - Syed Abdul Hadi`,
    description: project.description,
    keywords: project.technologies.join(", "),
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  console.log("Project data:", project)
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ProjectDetail project={project} />
        <RelatedProjects currentProjectId={project.id} category={project.category} />
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}
