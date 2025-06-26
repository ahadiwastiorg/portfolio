import { type NextRequest, NextResponse } from "next/server"

// Mock courses data
const MOCK_COURSES = [
  {
    id: "1",
    title: "React Masterclass: Build Modern Web Applications",
    description: "Master React from basics to advanced concepts. Build real-world projects and learn best practices.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    instructor: "Syed Abdul Hadi",
    instructorId: "1",
    category: "Frontend Development",
    categoryId: "frontend",
    price: 99,
    originalPrice: 149,
    duration: "12 hours",
    level: "Intermediate" as const,
    rating: 4.8,
    studentsCount: 245,
    lessonsCount: 24,
    isPublished: true,
    isFeatured: true,
    hasFreeTrial: true,
    trialLessons: 3,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
    tags: ["React", "JavaScript", "Frontend", "Hooks", "Context API"],
    requirements: ["Basic JavaScript knowledge", "HTML & CSS fundamentals", "Node.js installed on your computer"],
    whatYouWillLearn: [
      "Build modern React applications from scratch",
      "Master React Hooks and Context API",
      "Implement state management with Redux",
      "Create responsive and interactive UIs",
      "Deploy applications to production",
    ],
    lessons: [
      {
        id: "1-1",
        courseId: "1",
        title: "Introduction to React",
        description: "Learn what React is and why it's popular for building user interfaces.",
        videoUrl: "https://example.com/video1.mp4",
        duration: "15:30",
        order: 1,
        isFree: true,
        isPublished: true,
        resources: [],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "1-2",
        courseId: "1",
        title: "Setting Up Your Development Environment",
        description: "Install and configure all the tools you need to start building React apps.",
        videoUrl: "https://example.com/video2.mp4",
        duration: "20:45",
        order: 2,
        isFree: true,
        isPublished: true,
        resources: [],
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
    ],
  },
  {
    id: "2",
    title: "Node.js Complete Guide: Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and MongoDB.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    instructor: "Syed Abdul Hadi",
    instructorId: "1",
    category: "Backend Development",
    categoryId: "backend",
    price: 89,
    originalPrice: 129,
    duration: "15 hours",
    level: "Beginner" as const,
    rating: 4.9,
    studentsCount: 189,
    lessonsCount: 30,
    isPublished: true,
    isFeatured: true,
    hasFreeTrial: true,
    trialLessons: 2,
    createdAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2024-01-20T00:00:00.000Z",
    tags: ["Node.js", "Express", "MongoDB", "API", "Backend"],
    requirements: ["Basic JavaScript knowledge", "Understanding of web development concepts"],
    whatYouWillLearn: [
      "Build RESTful APIs with Node.js and Express",
      "Work with databases using MongoDB",
      "Implement authentication and authorization",
      "Deploy applications to cloud platforms",
      "Handle file uploads and email sending",
    ],
    lessons: [],
  },
  {
    id: "3",
    title: "TypeScript Fundamentals for Modern Development",
    description: "Learn TypeScript from scratch and write type-safe JavaScript applications.",
    thumbnail: "/placeholder.svg?height=300&width=400",
    instructor: "Syed Abdul Hadi",
    instructorId: "1",
    category: "Programming Languages",
    categoryId: "languages",
    price: 79,
    duration: "8 hours",
    level: "Beginner" as const,
    rating: 4.7,
    studentsCount: 156,
    lessonsCount: 16,
    isPublished: true,
    isFeatured: false,
    hasFreeTrial: true,
    trialLessons: 2,
    createdAt: "2024-01-10T00:00:00.000Z",
    updatedAt: "2024-01-25T00:00:00.000Z",
    tags: ["TypeScript", "JavaScript", "Types", "Programming"],
    requirements: ["Good understanding of JavaScript", "Basic programming concepts"],
    whatYouWillLearn: [
      "Understand TypeScript syntax and features",
      "Add type safety to JavaScript projects",
      "Work with interfaces and generics",
      "Configure TypeScript compiler",
      "Integrate TypeScript with popular frameworks",
    ],
    lessons: [],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const price = searchParams.get("price")
    const search = searchParams.get("search")

    let filteredCourses = [...MOCK_COURSES]

    // Apply filters
    if (category) {
      filteredCourses = filteredCourses.filter((course) => course.categoryId === category)
    }

    if (level) {
      filteredCourses = filteredCourses.filter((course) => course.level === level)
    }

    if (price === "free") {
      filteredCourses = filteredCourses.filter((course) => course.price === 0)
    } else if (price === "paid") {
      filteredCourses = filteredCourses.filter((course) => course.price > 0)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    return NextResponse.json({
      courses: filteredCourses,
      total: filteredCourses.length,
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
