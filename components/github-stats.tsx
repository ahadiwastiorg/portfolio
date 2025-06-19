"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, GitCommit, Star, GitFork } from "lucide-react"

export function GitHubStats() {
  // Mock GitHub data - in a real app, this would come from GitHub API
  const stats = {
    totalCommits: 1247,
    totalStars: 89,
    totalForks: 23,
    totalRepos: 42,
    contributions: [
      { date: "2024-01-15", count: 5 },
      { date: "2024-01-16", count: 3 },
      { date: "2024-01-17", count: 8 },
      { date: "2024-01-18", count: 2 },
      { date: "2024-01-19", count: 6 },
      { date: "2024-01-20", count: 4 },
      { date: "2024-01-21", count: 7 },
    ],
  }

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
            <div className="text-2xl font-bold">{stats.totalCommits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stars Earned</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStars}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forks</CardTitle>
            <GitFork className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalForks}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repositories</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRepos}</div>
            <p className="text-xs text-muted-foreground">3 active projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Graph */}
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
            {stats.contributions.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${
                  day.count === 0
                    ? "bg-muted"
                    : day.count <= 2
                      ? "bg-green-200 dark:bg-green-900"
                      : day.count <= 4
                        ? "bg-green-300 dark:bg-green-800"
                        : day.count <= 6
                          ? "bg-green-400 dark:bg-green-700"
                          : "bg-green-500 dark:bg-green-600"
                }`}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
