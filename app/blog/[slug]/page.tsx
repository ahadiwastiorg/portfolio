import { BlogPostDetail } from "@/components/blog/blog-post-detail"
import { RelatedPosts } from "@/components/blog/related-posts"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { BlogService } from "@/services/blog-service"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: { slug: string }
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
