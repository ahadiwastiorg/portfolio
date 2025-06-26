import { CoursesGrid } from "@/components/courses/courses-grid"
import { CourseFilters } from "@/components/courses/course-filters"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">Professional Development Courses</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Master cutting-edge technologies with hands-on courses designed by industry experts. Start your learning
                journey today with our free trial lessons.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <CourseFilters />
              </div>
              <div className="lg:col-span-3">
                <CoursesGrid />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
