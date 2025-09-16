import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Star } from "lucide-react"
import Link from "next/link"

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
  {
    id: "2",
    title: "Digital Banking Workflow Engine",
    slug: "digital-banking-workflow-engine",
    description: "Automated KYC and onboarding system for Mashreq Bank reducing processing time by 80%",
    longDescription:
      "Revolutionary digital banking workflow engine that automated the entire customer onboarding process for Mashreq Bank. The system reduced manual processing time from 5 days to under 2 hours while maintaining compliance with UAE banking regulations.",
    tags: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    technologies: [
      "Vue.js",
      "Vuex",
      "Express.js",
      "PostgreSQL",
      "Docker",
      "Jenkins",
      "AWS",
      "Microservices",
      "REST APIs",
    ],
    category: "Finance",
    image: "/placeholder.svg?height=300&width=500",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    githubUrl: "https://github.com/ahadiwasti/banking-workflow",
    liveUrl: "https://banking-demo.vercel.app",
    featured: true,
    status: "completed" as const,
    metrics: {
      efficiency: "80% faster",
      accuracy: "99.5%",
      compliance: "100%",
      cost_savings: "$2M/year",
    },
    highlights: [
      "Reduced onboarding time from 5 days to 2 hours",
      "Automated KYC verification process",
      "100% regulatory compliance",
      "Saved $2M annually in operational costs",
      "Integrated with 15+ external APIs",
    ],
    challenges: [
      "Complex regulatory compliance requirements",
      "Integration with legacy banking systems",
      "Real-time document verification",
      "Multi-language support for UAE market",
    ],
    solutions: [
      "Built modular workflow engine with configurable rules",
      "Implemented OCR and AI for document processing",
      "Created secure API gateway for system integration",
      "Developed comprehensive audit trail system",
    ],
    createdAt: "2022-05-10T00:00:00.000Z",
    updatedAt: "2023-10-15T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Cloud-Native Microservices Platform",
    slug: "cloud-native-microservices-platform",
    description: "Scalable microservices platform with auto-scaling, service mesh, and observability built with Golang",
    longDescription:
      "A comprehensive cloud-native microservices platform built from the ground up using Golang. Features automatic scaling, service mesh architecture, distributed tracing, and comprehensive monitoring. Deployed across multiple cloud providers with 99.99% availability.",
    tags: ["Golang", "Kubernetes", "Docker", "Istio"],
    technologies: [
      "Golang",
      "Kubernetes",
      "Docker",
      "Istio",
      "Prometheus",
      "Grafana",
      "Jaeger",
      "etcd",
      "gRPC",
      "PostgreSQL",
    ],
    category: "Infrastructure",
    image: "/placeholder.svg?height=300&width=500",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    githubUrl: "https://github.com/ahadiwasti/microservices-platform",
    liveUrl: "https://microservices-demo.vercel.app",
    featured: true,
    status: "completed" as const,
    metrics: {
      availability: "99.99%",
      latency: "< 50ms",
      throughput: "100K RPS",
      services: "50+",
    },
    highlights: [
      "50+ microservices with auto-scaling",
      "99.99% availability across regions",
      "Sub-50ms average response time",
      "Handles 100K+ requests per second",
      "Zero-downtime deployments",
    ],
    challenges: [
      "Service discovery and communication",
      "Distributed tracing and monitoring",
      "Data consistency across services",
      "Security and authentication at scale",
    ],
    solutions: [
      "Implemented service mesh with Istio",
      "Built comprehensive observability stack",
      "Used event sourcing for data consistency",
      "Implemented OAuth2 and JWT authentication",
    ],
    createdAt: "2023-03-20T00:00:00.000Z",
    updatedAt: "2024-01-10T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Real-Time Analytics Dashboard",
    slug: "real-time-analytics-dashboard",
    description: "High-performance analytics platform processing 1TB+ data daily with real-time visualizations",
    longDescription:
      "Enterprise-grade real-time analytics dashboard that processes over 1TB of data daily. Built with modern web technologies and featuring interactive visualizations, real-time updates, and advanced filtering capabilities.",
    tags: ["React", "D3.js", "WebSocket", "ClickHouse"],
    technologies: ["React", "TypeScript", "D3.js", "WebSocket", "ClickHouse", "Redis", "Node.js", "Docker", "AWS"],
    category: "Analytics",
    image: "/placeholder.svg?height=300&width=500",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    githubUrl: "https://github.com/ahadiwasti/analytics-dashboard",
    liveUrl: "https://analytics-demo.vercel.app",
    featured: false,
    status: "completed" as const,
    metrics: {
      data_volume: "1TB+/day",
      update_frequency: "Real-time",
      users: "1000+",
      queries: "10K/min",
    },
    highlights: [
      "Processes 1TB+ data daily",
      "Real-time updates via WebSocket",
      "Interactive D3.js visualizations",
      "Sub-second query performance",
      "Custom dashboard builder",
    ],
    challenges: [
      "Real-time data processing at scale",
      "Complex data aggregations",
      "Interactive visualization performance",
      "Multi-tenant data isolation",
    ],
    solutions: [
      "Implemented streaming data pipeline",
      "Used ClickHouse for fast analytics",
      "Optimized React rendering with virtualization",
      "Built row-level security system",
    ],
    createdAt: "2023-06-15T00:00:00.000Z",
    updatedAt: "2023-12-20T00:00:00.000Z",
  },
  {
    id: "5",
    title: "E-Commerce Marketplace Platform",
    slug: "ecommerce-marketplace-platform",
    description: "Multi-vendor marketplace with advanced search, payment processing, and inventory management",
    longDescription:
      "Comprehensive e-commerce marketplace platform supporting multiple vendors, advanced product search, integrated payment processing, and sophisticated inventory management. Built with modern technologies for scalability and performance.",
    tags: ["Next.js", "Stripe", "Elasticsearch", "PostgreSQL"],
    technologies: ["Next.js", "TypeScript", "Stripe", "Elasticsearch", "PostgreSQL", "Redis", "AWS", "Docker"],
    category: "E-Commerce",
    image: "/placeholder.svg?height=300&width=500",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    githubUrl: "https://github.com/ahadiwasti/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: false,
    status: "completed" as const,
    metrics: {
      vendors: "500+",
      products: "100K+",
      orders: "50K/month",
      revenue: "$5M+/year",
    },
    highlights: [
      "500+ active vendors",
      "100K+ products catalog",
      "50K+ monthly orders",
      "Advanced search with filters",
      "Multi-currency support",
    ],
    challenges: [
      "Complex multi-vendor architecture",
      "Real-time inventory synchronization",
      "Advanced search and filtering",
      "Payment processing across regions",
    ],
    solutions: [
      "Built modular multi-tenant architecture",
      "Implemented event-driven inventory system",
      "Used Elasticsearch for product search",
      "Integrated multiple payment gateways",
    ],
    createdAt: "2023-08-01T00:00:00.000Z",
    updatedAt: "2024-01-05T00:00:00.000Z",
  },
  {
    id: "6",
    title: "IoT Device Management System",
    slug: "iot-device-management-system",
    description: "Comprehensive IoT platform managing 100K+ devices with real-time monitoring and edge computing",
    longDescription:
      "Enterprise IoT device management system capable of handling over 100,000 connected devices. Features real-time monitoring, edge computing capabilities, predictive maintenance, and comprehensive device lifecycle management.",
    tags: ["Python", "MQTT", "InfluxDB", "Grafana"],
    technologies: ["Python", "FastAPI", "MQTT", "InfluxDB", "Grafana", "Docker", "Kubernetes", "AWS IoT", "TensorFlow"],
    category: "IoT",
    image: "/placeholder.svg?height=300&width=500",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    githubUrl: "https://github.com/ahadiwasti/iot-platform",
    liveUrl: "https://iot-demo.vercel.app",
    featured: false,
    status: "completed" as const,
    metrics: {
      devices: "100K+",
      uptime: "99.8%",
      data_points: "1B+/day",
      alerts: "< 1min",
    },
    highlights: [
      "Manages 100K+ IoT devices",
      "Processes 1B+ data points daily",
      "Real-time alerting system",
      "Predictive maintenance AI",
      "Edge computing support",
    ],
    challenges: [
      "Massive scale device connectivity",
      "Real-time data processing",
      "Device security and authentication",
      "Predictive analytics implementation",
    ],
    solutions: [
      "Built scalable MQTT broker cluster",
      "Implemented time-series data pipeline",
      "Used certificate-based device auth",
      "Developed ML models for predictions",
    ],
    createdAt: "2023-09-10T00:00:00.000Z",
    updatedAt: "2023-12-15T00:00:00.000Z",
  },
]

interface ProjectsGridProps {
  showAll: boolean
}

export function ProjectsGrid({ showAll }: ProjectsGridProps) {
  const displayProjects = showAll ? projects : projects.filter((p) => p.featured)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayProjects.map((project, index) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
          <Link href={`/projects/${project.slug}`} className="block">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="h-full w-full object-cover transition-all group-hover:scale-105"
              />
            </div>
          </Link>
          <CardHeader className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-xs">
                {project.category}
              </Badge>
              {project.featured && (
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs">Featured</span>
                </div>
              )}
            </div>
            <Link href={`/projects/${project.slug}`}>
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">{project.title}</CardTitle>
            </Link>
            <CardDescription className="line-clamp-3">{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                {Object.entries(project.metrics)
                  .slice(0, 2)
                  .map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-muted rounded">
                      <div className="font-semibold">{value}</div>
                      <div className="text-muted-foreground capitalize">{key.replace("_", " ")}</div>
                    </div>
                  ))}
              </div>
            )}

            <div className="flex gap-2 mt-auto">
              {/* <Button size="sm" variant="outline" asChild className="flex-1">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Link>
              </Button> */}
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
  )
}
