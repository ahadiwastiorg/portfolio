"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubService } from "@/services/external/github-service"
import { GitCommit, GitFork, Github, Star } from "lucide-react"
import { useEffect, useState } from "react"

export function GitHubStats() {
  const [stats, setStats] = useState({
    totalCommits: 1247,
    totalStars: 89,
    totalForks: 23,
    totalRepos: 42,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const githubStats = await GitHubService.getUserStats()
        setStats(githubStats)
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error)
        // Keep mock data as fallback
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Github className="h-6 w-6" />
        <h3 className="text-xl font-bold">GitHub Activity</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalCommits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stars Earned</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalStars}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forks</CardTitle>
            <GitFork className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalForks}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repositories</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalRepos}</div>
            <p className="text-xs text-muted-foreground">3 active projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Graph - simplified version */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${
                    level === 0
                      ? "bg-muted"
                      : level === 1
                        ? "bg-green-200 dark:bg-green-900"
                        : level === 2
                          ? "bg-green-300 dark:bg-green-800"
                          : level === 3
                            ? "bg-green-400 dark:bg-green-700"
                            : "bg-green-500 dark:bg-green-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">More</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* {Array.from({ length: 35 }).map((_, index) => {
              const intensity = Math.floor(Math.random() * 5)
              return (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm ${
                    intensity === 0
                      ? "bg-muted"
                      : intensity <= 1
                        ? "bg-green-200 dark:bg-green-900"
                        : intensity <= 2
                          ? "bg-green-300 dark:bg-green-800"
                          : intensity <= 3
                            ? "bg-green-400 dark:bg-green-700"
                            : "bg-green-500 dark:bg-green-600"
                  }`}
                  title={`${intensity} contributions`}
                />
              )
            })} */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
