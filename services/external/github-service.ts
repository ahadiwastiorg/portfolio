import { appConfig } from "@/config/app-config"
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
        ...(appConfig.github.token && {
          Authorization: `Bearer ${appConfig.github.token}`,
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
    console.log("auth token", appConfig.github.token)
    const response = await fetch(`${this.BASE_URL}/users/${this.USERNAME}/repos?${params}`, {
      headers: {
        ...(appConfig.github.token && {
          Authorization: `Bearer ${appConfig.github.token}`,
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
        ...(appConfig.github.token && {
          Authorization: `Bearer ${appConfig.github.token}`,
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
        ...(appConfig.github.token && {
          Authorization: `Bearer ${appConfig.github.token}`,
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
      console.log("Fetched repositories:", repos)
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
  static async getContributions(days: number = 35): Promise<number[]> {
  // Get recent repositories (limit for performance)
  const repos = await this.getRepositories({ per_page: 5, sort: "pushed" });
  const today = new Date();
  const dateMap: Record<string, number> = {};

  // Initialize dateMap with zeros for each day
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const key = d.toISOString().slice(0, 10);
    dateMap[key] = 0;
  }

  // For each repo, fetch recent commits and count by date
  for (const repo of repos) {
    try {
      // Fetch up to 100 commits per repo (GitHub API limitation)
      const commits = await this.getCommits(repo.name, { per_page: 100 });
      for (const commit of commits) {
        const date = commit.commit.author.date.slice(0, 10); // 'YYYY-MM-DD'
        if (dateMap[date] !== undefined) {
          dateMap[date]++;
        }
      }
    } catch (error) {
      console.warn(`Failed to get commits for ${repo.name}:`, error);
    }
  }

  // Return counts as an array (oldest to newest)
  return Object.values(dateMap);
}
}
