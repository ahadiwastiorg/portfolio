import { CodingExamples } from "@/components/coding-examples"

export function CodeSection() {
  return (
    <section id="code" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Code Showcase</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Interactive Code Examples</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Explore my coding skills through interactive, runnable examples. Each demo is fully functional and
              testable.
            </p>
          </div>
        </div>
        <CodingExamples showAll={false} limit={8} />
      </div>
    </section>
  )
}
