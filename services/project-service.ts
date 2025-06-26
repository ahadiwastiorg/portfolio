import { httpClient } from "@/lib/api/http-client"
import type { Project, ProjectFilters } from "@/types/project"
import type { ApiResponse } from "@/types/api"

export class ProjectService {
  static async getProjects(params?: {
    featured?: boolean
    filters?: ProjectFilters
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ projects: Project[]; total: number; hasMore: boolean }>> {
    const queryParams = new URLSearchParams()

    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.featured !== undefined) queryParams.append("featured", params.featured.toString())
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })
    }

    return httpClient.get(`/projects?${queryParams}`, { cache: "force-cache" })
  }

  static async getProject(id: string): Promise<ApiResponse<Project>> {
    return httpClient.get(`/projects/${id}`, { cache: "force-cache" })
  }

  static async createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<ApiResponse<Project>> {
    return httpClient.post("/projects", project)
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<ApiResponse<Project>> {
    return httpClient.put(`/projects/${id}`, updates)
  }

  static async deleteProject(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete(`/projects/${id}`)
  }
}
