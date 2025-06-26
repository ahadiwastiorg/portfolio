import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: "1",
    title: "Building Scalable Microservices with Golang",
    slug: "building-scalable-microservices-golang",
    excerpt:
      "Learn how to design and implement microservices architecture using Golang, Docker, and Kubernetes for maximum scalability.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Golang", "Microservices", "Docker", "Kubernetes"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "React Performance Optimization Techniques",
    slug: "react-performance-optimization-techniques",
    excerpt: "Discover advanced techniques to optimize React applications for better performance and user experience.",
    date: "2024-01-10",
    readTime: "6 min read",
    tags: ["React", "Performance", "JavaScript", "Optimization"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Understanding Modern Electronics: IoT and Edge Computing",
    slug: "understanding-modern-electronics-iot-edge-computing",
    excerpt: "Explore the intersection of electronics, IoT devices, and edge computing in today's connected world.",
    date: "2024-01-05",
    readTime: "7 min read",
    tags: ["Electronics", "IoT", "Edge Computing", "Hardware"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Database Design Patterns for Modern Applications",
    slug: "database-design-patterns-modern-applications",
    excerpt: "Explore different database design patterns and when to use them in modern web applications.",
    date: "2023-12-28",
    readTime: "7 min read",
    tags: ["Database", "Design Patterns", "MongoDB", "MySQL"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function BlogSection() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Blog</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Articles</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Sharing insights, tutorials, and experiences from my journey in software development.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-all group-hover:scale-105"
                />
              </div>
            </Link>
            <CardHeader>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
              </Link>
              <CardDescription>{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="ghost" className="p-0 h-auto font-medium group-hover:text-primary" asChild>
                <Link href={`/blog/${post.slug}`}>
                  Read more
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg" asChild>
          <Link href="/blog/all">View All Articles</Link>
        </Button>
      </div>
    </div>
  )
}
