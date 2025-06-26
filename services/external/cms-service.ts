// Enhanced CMS service with blog-specific methods

export interface CMSBlogPost {
  image: string
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  published: boolean
  updatedAt: string
  tags: string[]
  featuredImage: {
    url: string
    alt: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  readTime: number
  category: string
}

export class CMSService {
  
  private static readonly BASE_URL = process.env.CMS_API_URL || "http://localhost:1337/api"
  private static readonly API_TOKEN = process.env.CMS_API_TOKEN

  private static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    console.log("idr aya ho")
    const url = `${this.BASE_URL}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(this.API_TOKEN && { Authorization: `Bearer ${this.API_TOKEN}` }),
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.statusText}`)
    }
console.log("hanji idr aee kya")
    return response.json()
  }

  // Blog Posts
  static async getBlogPosts(options?: {
    published?: boolean
    featured?: boolean
    category?: string
    tags?: string[]
    search?: string
    limit?: number
    page?: number
  }): Promise<{ data: CMSBlogPost[]; meta: { total: number; hasMore: boolean } }> {
    const params = new URLSearchParams()

    if (options?.published !== undefined) {
      params.append("filters[published][$eq]", options.published.toString())
    }

    if (options?.featured !== undefined) {
      params.append("filters[featured][$eq]", options.featured.toString())
    }

    if (options?.category && options.category !== "all") {
      params.append("filters[category][slug][$eq]", options.category)
    }

    if (options?.tags && options.tags.length > 0) {
      options.tags.forEach((tag) => {
        params.append("filters[tags][slug][$in]", tag)
      })
    }

    if (options?.search) {
      params.append("filters[$or][0][title][$containsi]", options.search)
      params.append("filters[$or][1][excerpt][$containsi]", options.search)
      params.append("filters[$or][2][content][$containsi]", options.search)
    }

    if (options?.limit) {
      params.append("pagination[pageSize]", options.limit.toString())
    }

    if (options?.page) {
      params.append("pagination[page]", options.page.toString())
    }

    params.append("populate", "*")
    params.append("sort", "publishedAt:desc")

    const response = await this.request<{
      data: any[]
      meta: { pagination: { total: number; page: number; pageSize: number; pageCount: number } }
    }>(`/blog-posts?${params}`)

    return {
      data: response.data.map(this.transformBlogPost),
      meta: {
        total: response.meta.pagination.total,
        hasMore: response.meta.pagination.page < response.meta.pagination.pageCount,
      },
    }
  }

  static async getBlogPost(slug: string): Promise<CMSBlogPost> {
    const response = await this.request<{ data: any[] }>(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`)

    if (!response.data.length) {
      throw new Error("Blog post not found")
    }

    return this.transformBlogPost(response.data[0])
  }

  static async getRelatedPosts(currentPostId: string, tags: string[], limit = 3): Promise<CMSBlogPost[]> {
    const params = new URLSearchParams()

    params.append("filters[id][$ne]", currentPostId)
    params.append("pagination[pageSize]", limit.toString())

    if (tags.length > 0) {
      tags.forEach((tag) => {
        params.append("filters[tags][slug][$in]", tag)
      })
    }

    params.append("populate", "*")
    params.append("sort", "publishedAt:desc")

    const response = await this.request<{ data: any[] }>(`/blog-posts?${params}`)
    return response.data.map(this.transformBlogPost)
  }

  static async getBlogCategories(): Promise<Array<{ id: string; name: string; count: number }>> {
    const response = await this.request<{ data: any[] }>("/blog-categories?populate=blog_posts")

    return response.data.map((category: any) => ({
      id: category.attributes.slug,
      name: category.attributes.name,
      count: category.attributes.blog_posts?.data?.length || 0,
    }))
  }

  static async getBlogTags(): Promise<Array<{ id: string; name: string; count: number }>> {
    const response = await this.request<{ data: any[] }>("/blog-tags?populate=blog_posts")

    return response.data.map((tag: any) => ({
      id: tag.attributes.slug,
      name: tag.attributes.name,
      count: tag.attributes.blog_posts?.data?.length || 0,
    }))
  }

  private static transformBlogPost(data: any): CMSBlogPost {
    return {
      id: data.id.toString(),
      title: data.attributes.title,
      slug: data.attributes.slug,
      excerpt: data.attributes.excerpt,
      content: data.attributes.content,
      author: {
        name: data.attributes.author?.data?.attributes?.name || "Syed Abdul Hadi",
        avatar: data.attributes.author?.data?.attributes?.avatar?.data?.attributes?.url || "/placeholder.svg",
      },
      publishedAt: data.attributes.publishedAt,
      published: data.attributes.published || false,
      updatedAt: data.attributes.updatedAt,
      image: data.attributes.featuredImage?.data?.attributes?.url || "/placeholder.svg",
      tags: data.attributes.tags?.data?.map((tag: any) => tag.attributes.slug) || [],
      featuredImage: {
        url: data.attributes.featuredImage?.data?.attributes?.url || "/placeholder.svg",
        alt: data.attributes.featuredImage?.data?.attributes?.alternativeText || data.attributes.title,
      },
      seo: {
        title: data.attributes.seo?.title || data.attributes.title,
        description: data.attributes.seo?.description || data.attributes.excerpt,
        keywords: data.attributes.seo?.keywords || [],
      },
      readTime: data.attributes.readTime || 5,
      category: data.attributes.category?.data?.attributes?.slug || "uncategorized",
    }
  }
}
