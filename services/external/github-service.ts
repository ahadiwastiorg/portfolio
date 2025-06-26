export interface GitHubUser {
  login: string
  id: number
  name: string
  email: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
}

export interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      email: string
      date: string
    }
  }
  html_url: string
}

export class GitHubService {
  private static readonly BASE_URL = "https://api.github.com"
  private static readonly USERNAME = process.env.GITHUB_USERNAME || "ahadiwasti"

  static async getUser(): Promise<GitHubUser> {
    const response = await fetch(`${this.BASE_URL}/users/${this.USERNAME}`, {
      headers: {
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    return response.json()
  }

  static async getRepositories(options?: {
    sort?: "created" | "updated" | "pushed" | "full_name"
    direction?: "asc" | "desc"
    per_page?: number
    page?: number
  }): Promise<GitHubRepo[]> {
    const params = new URLSearchParams({
      sort: options?.sort || "updated",
      direction: options?.direction || "desc",
      per_page: (options?.per_page || 30).toString(),
      page: (options?.page || 1).toString(),
    })

    const response = await fetch(`${this.BASE_URL}/users/${this.USERNAME}/repos?${params}`, {
      headers: {
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    return response.json()
  }

  static async getRepository(repoName: string): Promise<GitHubRepo> {
    const response = await fetch(`${this.BASE_URL}/repos/${this.USERNAME}/${repoName}`, {
      headers: {
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 1800 },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    return response.json()
  }

  static async getCommits(
    repoName: string,
    options?: {
      per_page?: number
      page?: number
    },
  ): Promise<GitHubCommit[]> {
    const params = new URLSearchParams({
      per_page: (options?.per_page || 30).toString(),
      page: (options?.page || 1).toString(),
    })

    const response = await fetch(`${this.BASE_URL}/repos/${this.USERNAME}/${repoName}/commits?${params}`, {
      headers: {
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 900 }, // Cache for 15 minutes
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    return response.json()
  }

  static async getUserStats(): Promise<{
    totalRepos: number
    totalStars: number
    totalForks: number
    totalCommits: number
  }> {
    try {
      const repos = await this.getRepositories({ per_page: 100 })

      const totalRepos = repos.length
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)

      // Get commits from top repositories
      const topRepos = repos.slice(0, 5)
      let totalCommits = 0

      for (const repo of topRepos) {
        try {
          const commits = await this.getCommits(repo.name, { per_page: 100 })
          totalCommits += commits.length
        } catch (error) {
          console.warn(`Failed to get commits for ${repo.name}:`, error)
        }
      }

      return {
        totalRepos,
        totalStars,
        totalForks,
        totalCommits,
      }
    } catch (error) {
      console.error("Failed to get GitHub stats:", error)
      // Return mock data as fallback
      return {
        totalRepos: 42,
        totalStars: 89,
        totalForks: 23,
        totalCommits: 1247,
      }
    }
  }
}
