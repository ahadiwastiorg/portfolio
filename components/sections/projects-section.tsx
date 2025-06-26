import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectsGrid } from "@/components/projects/projects-grid"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Portfolio</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              A showcase of my recent work and contributions.
            </p>
          </div>
        </div>

        <ProjectsGrid showAll={false} />

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
