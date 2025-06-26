"use client"

// import { CommentsSection } from "@/components/learn/comments-section"
// import { LessonResources } from "@/components/learn/lesson-resources"
// import { LessonSidebar } from "@/components/learn/lesson-sidebar"
// import { VideoPlayer } from "@/components/learn/video-player"
import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/use-session"
import { ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface LearnPageProps {
  params: {
    courseId: string
    lessonId: string
  }
}

export default function LearnPage({ params }: LearnPageProps) {
  const { user, isAuthenticated } = useSession()
  const router = useRouter()
  const [lesson, setLesson] = useState<any>(null)
  const [course, setCourse] = useState<any>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLessonData()
  }, [params.courseId, params.lessonId])

  const fetchLessonData = async () => {
    try {
      // Fetch lesson and course data
      const [lessonRes, courseRes] = await Promise.all([
        fetch(`/api/lessons/${params.lessonId}`),
        fetch(`/api/courses/${params.courseId}`),
      ])

      const lessonData = await lessonRes.json()
      const courseData = await courseRes.json()

      setLesson(lessonData)
      setCourse(courseData)

      // Check access permissions
      if (lessonData.isFree) {
        setHasAccess(true)
      } else if (isAuthenticated && user) {
        // Check if user is enrolled or has active subscription
        const enrollmentRes = await fetch(`/api/enrollments/check?courseId=${params.courseId}&userId=${user.id}`)
        const enrollment = await enrollmentRes.json()
        setHasAccess(enrollment.hasAccess)
      }
    } catch (error) {
      console.error("Error fetching lesson data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Lock className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Premium Content</h1>
            <p className="text-muted-foreground mb-8">
              This lesson is part of a premium course. Enroll now to access all lessons and resources.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href={`/courses/${params.courseId}`}>View Course</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/courses/${params.courseId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold">{lesson?.title}</h1>
              <p className="text-sm text-muted-foreground">{course?.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 p-6">
        <div className="lg:col-span-3 space-y-6">
          {/* <VideoPlayer
            videoUrl={lesson?.videoUrl}
            title={lesson?.title}
            onProgress={(progress) => {
              // Track lesson progress
              if (isAuthenticated && user) {
                fetch("/api/progress", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user.id,
                    lessonId: params.lessonId,
                    progress,
                  }),
                })
              }
            }}
          /> */}

          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About this lesson</h2>
            <p className="text-muted-foreground">{lesson?.description}</p>
          </div>

          {/* <LessonResources resources={lesson?.resources || []} />
          <CommentsSection lessonId={params.lessonId} /> */}
        </div>

        <div className="lg:col-span-1">
          {/* <LessonSidebar
            course={course}
            currentLessonId={params.lessonId}
            userProgress={[]} // TODO: Fetch user progress
          /> */}
        </div>
      </div>
    </div>
  )
}
