"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AnalyticsService } from "@/services/external/analytics-service"
import type { CMSBlogPost } from "@/services/external/cms-service"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

interface BlogCardProps {
  post: CMSBlogPost
}

export function BlogCard({ post }: BlogCardProps) {
    console.log("Blog card clicked:", post.title)
  const handleCardClick = () => {
  
    AnalyticsService.trackEvent({
      name: "blog_card_clicked",
      properties: {
        post_id: post.id,
        post_title: post.title,
        post_category: post.tags[0] || "uncategorized",
      },
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <Link href={`/blog/${post.slug}`} onClick={handleCardClick} className="block">
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={post.featuredImage.url || "/placeholder.svg?height=200&width=400"}
            alt={post.featuredImage.alt || post.title}
            className="h-full w-full object-cover transition-all group-hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author.name}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime} min read
          </div>
        </div>
        <Link href={`/blog/${post.slug}`} onClick={handleCardClick}>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          variant="ghost"
          className="p-0 h-auto font-medium group-hover:text-primary w-full justify-start"
          asChild
        >
          <Link href={`/blog/${post.slug}`} onClick={handleCardClick}>
            Read more
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
