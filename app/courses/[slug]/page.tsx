import { CourseDetail } from "@/components/courses/course-detail"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

interface CoursePageProps {
  params: {
    slug: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <CourseDetail courseSlug={params.slug} />
      </main>
      <Footer />
    </div>
  )
}
