import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProjectsGrid } from "@/components/projects/projects-grid"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container px-4 md:px-6 py-16">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Portfolio</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">All Projects</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                A comprehensive showcase of my work and contributions across different technologies.
              </p>
            </div>
          </div>
          <ProjectsGrid showAll={true} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
