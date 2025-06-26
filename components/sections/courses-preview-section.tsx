"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/courses/course-card"
import { ArrowRight, BookOpen } from "lucide-react"
import type { Course } from "@/types/course"

export function CoursesPreviewSection() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedCourses()
  }, [])

  const fetchFeaturedCourses = async () => {
    try {
      const response = await fetch("/api/courses?featured=true&limit=3")
      const data = await response.json()
      setFeaturedCourses(data.courses?.slice(0, 3) || [])
    } catch (error) {
      console.error("Error fetching featured courses:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              <BookOpen className="h-4 w-4 inline mr-2" />
              Online Learning
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Master New Skills with Expert-Led Courses
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Join thousands of students learning cutting-edge technologies. Start with our free trial lessons and
              unlock your potential in software development.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">7-Day</div>
            <div className="text-sm text-muted-foreground">Free Trial</div>
            <p className="text-sm">Start learning with no commitment</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Expert Courses</div>
            <p className="text-sm">Comprehensive curriculum for all levels</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
            <p className="text-sm">Get help whenever you need it</p>
          </div>
        </div>
      </div>
    </section>
  )
}
