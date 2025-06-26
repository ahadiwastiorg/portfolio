import { BlogListPage } from "@/components/blog/blog-list-page"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

export const metadata = {
  title: "All Articles - Syed Abdul Hadi",
  description: "Browse all blog articles about software development, technology, and programming insights.",
}

export default function AllBlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <BlogListPage />
      </main>
      <Footer />
    </div>
  )
}
