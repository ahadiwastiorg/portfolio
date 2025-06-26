"use client"

import { BlogService } from "@/services/blog-service"
import type { CMSBlogPost } from "@/services/external/cms-service"
import { useEffect, useState } from "react"
import { BlogCard } from "./blog-card"
import { BlogCardSkeleton } from "./blog-card-skeleton"

interface RelatedPostsProps {
  currentPostId: string
  tags: string[]
}

export function RelatedPosts({ currentPostId, tags }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<CMSBlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedPosts() {
      try {
        const response = await BlogService.getRelatedPosts(currentPostId, tags, 3)
        setRelatedPosts(response.data)
      } catch (error) {
        console.error("Failed to fetch related posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [currentPostId, tags])

  if (loading) {
    return (
      <section className="container px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="container px-4 md:px-6 py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
