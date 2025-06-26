"use client"

import { Button } from "@/components/ui/button"
import { BlogCard } from "./blog-card"
import { BlogCardSkeleton } from "./blog-card-skeleton"
import { Loader2 } from "lucide-react"
import type { CMSBlogPost } from "@/services/external/cms-service"

interface BlogGridProps {
  posts: CMSBlogPost[]
  loading: boolean
  loadingMore: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export function BlogGrid({ posts, loading, loadingMore, hasMore, onLoadMore }: BlogGridProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-muted rounded animate-pulse" />
          <div className="h-6 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No articles found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {posts.length} {posts.length === 1 ? "Article" : "Articles"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Showing {posts.length} of {posts.length}
          {hasMore && "+"} results
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button onClick={onLoadMore} disabled={loadingMore} size="lg" variant="outline">
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Articles"
            )}
          </Button>
        </div>
      )}

      {/* End Message */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You've reached the end of the articles.</p>
        </div>
      )}
    </div>
  )
}
