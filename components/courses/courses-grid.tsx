"use client"

import { useState, useEffect } from "react"
import { CourseCard } from "./course-card"
import { CourseCardSkeleton } from "./course-card-skeleton"
import type { Course } from "@/types/course"

export function CoursesGrid() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: "",
    level: "",
    price: "",
    search: "",
  })

  useEffect(() => {
    fetchCourses()
  }, [filters])

  const fetchCourses = async () => {
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })

      const response = await fetch(`/api/courses?${params}`)
      const data = await response.json()
      setCourses(data.courses || [])
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {courses.length} Course{courses.length !== 1 ? "s" : ""} Available
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
