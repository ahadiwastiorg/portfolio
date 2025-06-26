import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      
      <Header />
      <main className="pt-20">
        <div className="container px-4 md:px-6 py-16">
          <BlogSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
