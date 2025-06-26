import { httpClient } from "@/lib/api/http-client"
import type { CMSBlogPost } from "@/services/external/cms-service"
import type { ApiResponse } from "@/types/api"

export interface BlogPostsResponse {
  posts: CMSBlogPost[]
  total: number
  hasMore: boolean
  categories: Array<{ id: string; name: string; count: number }>
  tags: Array<{ id: string; name: string; count: number }>
}

export class BlogService {
  static async getBlogPosts(params?: {
    page?: number
    limit?: number
    category?: string
    tags?: string[]
    search?: string
    published?: boolean
    featured?: boolean
  }): Promise<ApiResponse<BlogPostsResponse>> {
    const queryParams = new URLSearchParams()

    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.category) queryParams.append("category", params.category)
    if (params?.tags) {
      params.tags.forEach((tag) => queryParams.append("tags", tag))
    }
    if (params?.search) queryParams.append("search", params.search)
    if (params?.published !== undefined) queryParams.append("published", params.published.toString())
    if (params?.featured !== undefined) queryParams.append("featured", params.featured.toString())

    return httpClient.get(`/blog?${queryParams}`, { cache: "no-store" })
  }

  static async getBlogPost(slug: string): Promise<ApiResponse<CMSBlogPost>> {
    console.log("Fetching blog post with slug inside the blog service:3", slug)
    return httpClient.get(`/blog/${slug}`, { cache: "no-store" })
  }

  static async getRelatedPosts(currentPostId: string, tags: string[], limit = 3): Promise<ApiResponse<CMSBlogPost[]>> {
    const queryParams = new URLSearchParams({
      exclude: currentPostId,
      limit: limit.toString(),
    })

    tags.forEach((tag) => queryParams.append("tags", tag))

    return httpClient.get(`/blog/related?${queryParams}`, { cache: "no-store" })
  }

  static async getBlogCategories(): Promise<ApiResponse<Array<{ id: string; name: string; count: number }>>> {
    return httpClient.get("/blog/categories", { cache: "force-cache" })
  }

  static async getBlogTags(): Promise<ApiResponse<Array<{ id: string; name: string; count: number }>>> {
    return httpClient.get("/blog/tags", { cache: "force-cache" })
  }

  static async createBlogPost(
    post: Omit<CMSBlogPost, "id" | "publishedAt" | "updatedAt">,
  ): Promise<ApiResponse<CMSBlogPost>> {
    return httpClient.post("/blog", post)
  }

  static async updateBlogPost(id: string, updates: Partial<CMSBlogPost>): Promise<ApiResponse<CMSBlogPost>> {
    return httpClient.put(`/blog/${id}`, updates)
  }

  static async deleteBlogPost(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete(`/blog/${id}`)
  }
}
