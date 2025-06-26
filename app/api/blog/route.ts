import { type NextRequest, NextResponse } from "next/server"

// Mock blog posts data with complete structure
const mockBlogPosts = [
  {
    id: "1",
    title: "Building Scalable Microservices with Golang",
    slug: "building-scalable-microservices-golang",
    excerpt:
      "Learn how to design and implement microservices architecture using Golang, Docker, and Kubernetes for maximum scalability.",
    content: `
      <h2>Introduction</h2>
      <p>Microservices architecture has become the go-to solution for building scalable, maintainable applications. In this comprehensive guide, we'll explore how to build microservices using Golang, Docker, and Kubernetes.</p>
      
      <h2>Why Golang for Microservices?</h2>
      <p>Golang offers several advantages for microservices development:</p>
      <ul>
        <li>Fast compilation and execution</li>
        <li>Built-in concurrency support</li>
        <li>Small binary size</li>
        <li>Excellent standard library</li>
      </ul>
      
      <h2>Setting Up Your Development Environment</h2>
      <p>Before we start building our microservices, let's set up our development environment...</p>
      
      <h2>Building Your First Microservice</h2>
      <p>Let's create a simple user service that handles user registration and authentication...</p>
      
      <h2>Containerization with Docker</h2>
      <p>Docker allows us to package our microservices into lightweight, portable containers...</p>
      
      <h2>Orchestration with Kubernetes</h2>
      <p>Kubernetes provides the orchestration layer for managing our microservices at scale...</p>
      
      <h2>Conclusion</h2>
      <p>Building microservices with Golang, Docker, and Kubernetes provides a robust foundation for scalable applications. The combination of Go's performance, Docker's portability, and Kubernetes' orchestration capabilities makes this stack ideal for modern cloud-native applications.</p>
    `,
    author: {
      name: "Syed Abdul Hadi",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    publishedAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
    tags: ["golang", "microservices", "docker", "kubernetes", "technology"],
    featuredImage: {
      url: "/placeholder.svg?height=400&width=800",
      alt: "Microservices Architecture Diagram",
    },
    seo: {
      title: "Building Scalable Microservices with Golang - Complete Guide",
      description:
        "Learn how to design and implement microservices architecture using Golang, Docker, and Kubernetes for maximum scalability.",
      keywords: ["golang", "microservices", "docker", "kubernetes", "scalability"],
    },
    readTime: 8,
    category: "technology",
  },
  {
    id: "2",
    title: "React Performance Optimization Techniques",
    slug: "react-performance-optimization-techniques",
    excerpt: "Discover advanced techniques to optimize React applications for better performance and user experience.",
    content: `
      <h2>Introduction</h2>
      <p>React performance optimization is crucial for delivering fast, responsive user experiences. In this article, we'll explore various techniques to optimize your React applications.</p>
      
      <h2>Understanding React Performance</h2>
      <p>Before diving into optimization techniques, it's important to understand how React works under the hood...</p>
      
      <h2>Memoization Techniques</h2>
      <p>React.memo, useMemo, and useCallback are powerful tools for preventing unnecessary re-renders...</p>
      
      <h2>Code Splitting and Lazy Loading</h2>
      <p>Breaking your application into smaller chunks can significantly improve initial load times...</p>
      
      <h2>Virtual Scrolling</h2>
      <p>For large lists, virtual scrolling can dramatically improve performance...</p>
      
      <h2>Bundle Analysis and Optimization</h2>
      <p>Understanding what's in your bundle is the first step to optimizing it...</p>
      
      <h2>Conclusion</h2>
      <p>Performance optimization is an ongoing process. By implementing these techniques, you can ensure your React applications remain fast and responsive as they grow.</p>
    `,
    author: {
      name: "Syed Abdul Hadi",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    publishedAt: "2024-01-10T00:00:00.000Z",
    updatedAt: "2024-01-10T00:00:00.000Z",
    tags: ["react", "performance", "javascript", "optimization", "programming"],
    featuredImage: {
      url: "/placeholder.svg?height=400&width=800",
      alt: "React Performance Optimization",
    },
    seo: {
      title: "React Performance Optimization Techniques - Advanced Guide",
      description:
        "Discover advanced techniques to optimize React applications for better performance and user experience.",
      keywords: ["react", "performance", "optimization", "javascript", "frontend"],
    },
    readTime: 6,
    category: "programming",
  },
  {
    id: "3",
    title: "Understanding Modern Electronics: IoT and Edge Computing",
    slug: "understanding-modern-electronics-iot-edge-computing",
    excerpt: "Explore the intersection of electronics, IoT devices, and edge computing in today's connected world.",
    content: `
      <h2>Introduction</h2>
      <p>The world of electronics has evolved dramatically with the rise of IoT and edge computing. This article explores how these technologies are shaping our connected future.</p>
      
      <h2>The IoT Revolution</h2>
      <p>Internet of Things (IoT) devices are everywhere, from smart homes to industrial sensors...</p>
      
      <h2>Edge Computing Fundamentals</h2>
      <p>Edge computing brings processing power closer to where data is generated...</p>
      
      <h2>Hardware Considerations</h2>
      <p>Designing electronics for IoT and edge computing requires careful consideration of power, connectivity, and processing capabilities...</p>
      
      <h2>Security Challenges</h2>
      <p>With billions of connected devices, security becomes paramount...</p>
      
      <h2>Future Trends</h2>
      <p>Looking ahead, we can expect even more integration between electronics, AI, and cloud services...</p>
      
      <h2>Conclusion</h2>
      <p>The convergence of electronics, IoT, and edge computing is creating new possibilities for innovation and efficiency across industries.</p>
    `,
    author: {
      name: "Syed Abdul Hadi",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    publishedAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2024-01-05T00:00:00.000Z",
    tags: ["electronics", "iot", "edge-computing", "hardware", "technology"],
    featuredImage: {
      url: "/placeholder.svg?height=400&width=800",
      alt: "IoT and Edge Computing Devices",
    },
    seo: {
      title: "Understanding Modern Electronics: IoT and Edge Computing",
      description:
        "Explore the intersection of electronics, IoT devices, and edge computing in today's connected world.",
      keywords: ["electronics", "iot", "edge computing", "hardware", "connected devices"],
    },
    readTime: 7,
    category: "electronics",
  },
  {
    id: "4",
    title: "Database Design Patterns for Modern Applications",
    slug: "database-design-patterns-modern-applications",
    excerpt: "Explore different database design patterns and when to use them in modern web applications.",
    content: `
      <h2>Introduction</h2>
      <p>Database design is a critical aspect of application development. In this article, we'll explore various design patterns and their applications in modern web development.</p>
      
      <h2>Relational Database Patterns</h2>
      <p>Traditional relational patterns still have their place in modern applications...</p>
      
      <h2>NoSQL Design Patterns</h2>
      <p>Document stores, key-value pairs, and graph databases offer different approaches...</p>
      
      <h2>Microservices Database Patterns</h2>
      <p>Database per service, shared databases, and event sourcing patterns...</p>
      
      <h2>Caching Strategies</h2>
      <p>Redis, Memcached, and application-level caching patterns...</p>
      
      <h2>Performance Optimization</h2>
      <p>Indexing strategies, query optimization, and connection pooling...</p>
      
      <h2>Conclusion</h2>
      <p>Choosing the right database design pattern depends on your specific use case, scalability requirements, and team expertise.</p>
    `,
    author: {
      name: "Syed Abdul Hadi",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    publishedAt: "2023-12-28T00:00:00.000Z",
    updatedAt: "2023-12-28T00:00:00.000Z",
    tags: ["database", "design-patterns", "mongodb", "mysql", "programming"],
    featuredImage: {
      url: "/placeholder.svg?height=400&width=800",
      alt: "Database Design Patterns",
    },
    seo: {
      title: "Database Design Patterns for Modern Applications",
      description: "Explore different database design patterns and when to use them in modern web applications.",
      keywords: ["database", "design patterns", "mongodb", "mysql", "architecture"],
    },
    readTime: 7,
    category: "programming",
  },
  {
    id: "5",
    title: "AWS Lambda Best Practices for Serverless Applications",
    slug: "aws-lambda-best-practices-serverless-applications",
    excerpt:
      "A comprehensive guide to building efficient serverless applications using AWS Lambda and related services.",
    content: `
      <h2>Introduction</h2>
      <p>AWS Lambda has revolutionized how we build and deploy applications. This guide covers best practices for serverless development.</p>
      
      <h2>Function Design Principles</h2>
      <p>Single responsibility, stateless design, and proper error handling...</p>
      
      <h2>Performance Optimization</h2>
      <p>Cold starts, memory allocation, and execution time optimization...</p>
      
      <h2>Security Best Practices</h2>
      <p>IAM roles, environment variables, and VPC configuration...</p>
      
      <h2>Monitoring and Debugging</h2>
      <p>CloudWatch logs, X-Ray tracing, and custom metrics...</p>
      
      <h2>Cost Optimization</h2>
      <p>Right-sizing functions, provisioned concurrency, and billing optimization...</p>
      
      <h2>Conclusion</h2>
      <p>Following these best practices will help you build robust, scalable, and cost-effective serverless applications.</p>
    `,
    author: {
      name: "Syed Abdul Hadi",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    publishedAt: "2023-12-20T00:00:00.000Z",
    updatedAt: "2023-12-20T00:00:00.000Z",
    tags: ["aws", "lambda", "serverless", "cloud", "technology"],
    featuredImage: {
      url: "/placeholder.svg?height=400&width=800",
      alt: "AWS Lambda Serverless Architecture",
    },
    seo: {
      title: "AWS Lambda Best Practices for Serverless Applications",
      description:
        "A comprehensive guide to building efficient serverless applications using AWS Lambda and related services.",
      keywords: ["aws", "lambda", "serverless", "cloud", "best practices"],
    },
    readTime: 10,
    category: "cloud",
  },
]

// Mock categories
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

// Mock tags
const mockTags = [
  { id: "react", name: "React", count: 25 },
  { id: "nodejs", name: "Node.js", count: 20 },
  { id: "typescript", name: "TypeScript", count: 18 },
  { id: "golang", name: "Golang", count: 15 },
  { id: "docker", name: "Docker", count: 12 },
  { id: "aws", name: "AWS", count: 16 },
  { id: "microservices", name: "Microservices", count: 10 },
  { id: "javascript", name: "JavaScript", count: 22 },
  { id: "vue", name: "Vue.js", count: 14 },
  { id: "angular", name: "Angular", count: 8 },
  { id: "electronics", name: "Electronics", count: 12 },
  { id: "iot", name: "IoT", count: 8 },
  { id: "edge-computing", name: "Edge Computing", count: 6 },
  { id: "hardware", name: "Hardware", count: 10 },
  { id: "kubernetes", name: "Kubernetes", count: 9 },
  { id: "performance", name: "Performance", count: 14 },
  { id: "optimization", name: "Optimization", count: 11 },
  { id: "technology", name: "Technology", count: 18 },
  { id: "programming", name: "Programming", count: 15 },
  { id: "web-development", name: "Web Development", count: 20 },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const tags = searchParams.getAll("tags")
    const search = searchParams.get("search")
    const published = searchParams.get("published")
    const featured = searchParams.get("featured")

    let filteredPosts = [...mockBlogPosts]

    // Apply filters
    if (published === "true") {
      // All mock posts are published
    }

    if (featured === "true") {
      // For demo, consider first 3 posts as featured
      filteredPosts = filteredPosts.slice(0, 3)
    }

    if (category && category !== "all") {
      filteredPosts = filteredPosts.filter((post) => post.category === category)
    }

    if (tags.length > 0) {
      filteredPosts = filteredPosts.filter((post) => tags.some((tag) => post.tags.includes(tag)))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    const response = {
      posts: paginatedPosts,
      total: filteredPosts.length,
      hasMore: endIndex < filteredPosts.length,
      categories: mockCategories,
      tags: mockTags,
    }

    return NextResponse.json(response, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Blog API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
