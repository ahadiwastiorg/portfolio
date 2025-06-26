"use client"

import { toast } from "@/hooks/use-toast"
import { BlogService } from "@/services/blog-service"
import type { CMSBlogPost } from "@/services/external/cms-service"
import { useEffect, useState } from "react"
import { BlogGrid } from "./blog-grid"
import { BlogSidebar } from "./blog-sidebar"

export interface BlogFilters {
  category: string
  tags: string[]
  search: string
}

export function BlogListPage() {
  const [posts, setPosts] = useState<CMSBlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<BlogFilters>({
    category: "all",
    tags: [],
    search: "",
  })

  const POSTS_PER_PAGE = 10

  const fetchPosts = async (pageNum: number, currentFilters: BlogFilters, append = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const response = await BlogService.getBlogPosts({
        page: pageNum,
        limit: POSTS_PER_PAGE,
        category: currentFilters.category === "all" ? undefined : currentFilters.category,
        tags: currentFilters.tags.length > 0 ? currentFilters.tags : undefined,
        search: currentFilters.search || undefined,
        published: true,
      })

      if (append) {
        setPosts((prev) => [...prev, ...response.data.posts])
      } else {
        setPosts(response.data.posts)
      }

      setHasMore(response.data.hasMore)
    } catch (error: any) {
      console.error("Failed to fetch blog posts:", error)
      toast({
        title: "Error",
        description: "Failed to load blog posts. Please try again.",
        variant: "destructive",
      })

      // Set empty state on error
      if (!append) {
        setPosts([])
        setHasMore(false)
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    setPage(1)
    fetchPosts(1, filters, false)
  }, [filters])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchPosts(nextPage, filters, true)
  }

  const handleFiltersChange = (newFilters: BlogFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">All Articles</h1>
        <p className="text-muted-foreground md:text-xl">
          Explore my thoughts on software development, technology trends, and programming insights.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BlogSidebar filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <BlogGrid
            posts={posts}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </div>
    </div>
  )
}
