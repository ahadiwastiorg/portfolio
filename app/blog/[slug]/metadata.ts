import { BlogService } from "@/services/blog-service"
import type { Metadata } from "next"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log("Generating metadata for blog post:", params)

  try {
    const response = await BlogService.getBlogPost(params.slug)
    const post = response.data

    return {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      keywords: post.seo?.keywords?.join(", ") || post.tags.join(", "),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.featuredImage.url],
        type: "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.author.name],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [post.featuredImage.url],
      },
    }
  } catch (error) {
    return {
      title: "Blog Post Not Found",
      description: "This blog post could not be found.",
    }
  }
}
