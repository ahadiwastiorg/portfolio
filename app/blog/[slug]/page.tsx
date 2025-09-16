import { BlogPostDetail } from "@/components/blog/blog-post-detail"
import { RelatedPosts } from "@/components/blog/related-posts"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { BlogService } from "@/services/blog-service"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: { slug: string }
}

//generatestaticParams
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const response = await BlogService.getBlogPosts()
    const posts = response.data
    return posts.posts.map((post: { slug: string }) => ({ slug: post.slug }))
  } catch (error) {
    // Fallback to mock data if API is unavailable
    return [
      { slug: "first-post" },
      { slug: "second-post" },
    ]
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
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


// createAsyncThunk

export default async function BlogPostPage({ params }: BlogPostPageProps) {
//  const param = await params
  // console.log("Blog post slug:1", param.slug)
  try {
    console.log("Fetching blog post with slug: 2", params.slug)
    const response = await BlogService.getBlogPost(params.slug)
    console.log("Blog post fetched successfully:last", response.data.id)
    if (!response.data) {
      console.error("No blog post found for slug:err", params.slug)
      notFound()
    }
    console.log("Blog post data about to interpolate")
    const post = response.data
    console.log("Blog post data:", post.id, post.title)
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <BlogPostDetail post={post} />
          <RelatedPosts currentPostId={post.id} tags={post.tags} />
        </main>
        <Footer />
      </div>
    )
  } catch (error) {

    console.error("Error fetching blog post:", error)
    notFound()
  }
}
