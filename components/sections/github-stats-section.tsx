import { GitHubStats } from "@/components/github-stats"

export function GitHubStatsSection() {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container px-4 md:px-6">
        <GitHubStats />
      </div>
    </section>
  )
}
