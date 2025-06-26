"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnalyticsService } from "@/services/external/analytics-service"
import type { CMSBlogPost } from "@/services/external/cms-service"
import { ArrowLeft, Bookmark, Calendar, Clock, Share2, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface BlogPostDetailProps {
  post: CMSBlogPost
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  const router = useRouter()

  useEffect(() => {
    // Track blog post view
    AnalyticsService.trackEvent({
      name: "blog_post_viewed",
      properties: {
        post_id: post.id,
        post_title: post.title,
        post_category: post.tags[0] || "uncategorized",
        read_time: post.readTime,
      },
    })
  }, [post])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        AnalyticsService.trackEvent({
          name: "blog_post_shared",
          properties: { post_id: post.id, method: "native" },
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      AnalyticsService.trackEvent({
        name: "blog_post_shared",
        properties: { post_id: post.id, method: "clipboard" },
      })
    }
  }

  const handleBookmark = () => {
    // Implement bookmark functionality
    AnalyticsService.trackEvent({
      name: "blog_post_bookmarked",
      properties: { post_id: post.id },
    })
  }

  return (
    <article className="container px-4 md:px-6 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Button>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>

          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleBookmark}>
              <Bookmark className="h-4 w-4 mr-2" />
              Bookmark
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
            <img
              src={post.featuredImage?.url || "/placeholder.svg?height=400&width=800"}
              alt={post.featuredImage?.alt || post.title}
              className="h-full w-full object-cover"
            />
          </div>


        {/* Content */}
        <Card>
          <CardContent className="p-8">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Author Bio */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img
                  src={post.author.avatar || "/placeholder.svg?height=64&width=64"}
                  alt={post.author.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{post.author.name}</h3>
                <p className="text-muted-foreground">
                  Senior Software Engineer with 8+ years of experience in full-stack development, microservices, and
                  cloud technologies.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </article>
  )
}
