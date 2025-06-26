import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Clock, Users, Star, Play } from "lucide-react"
import type { Course } from "@/types/course"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.hasFreeTrial && (
          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">Free Trial</Badge>
        )}
        {course.isFeatured && (
          <Badge className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600">Featured</Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <Badge variant="outline" className="shrink-0">
            {course.level}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.studentsCount}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
            )}
            <span className="text-xl font-bold text-primary">{course.price === 0 ? "Free" : `$${course.price}`}</span>
          </div>
          <span className="text-sm text-muted-foreground">{course.lessonsCount} lessons</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button asChild className="flex-1">
            <Link href={`/courses/${course.id}`}>View Course</Link>
          </Button>
          {course.hasFreeTrial && (
            <Button variant="outline" asChild>
              <Link href={`/learn/${course.id}/${course.lessons[0]?.id}`}>Try Free</Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
