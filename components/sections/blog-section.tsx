import { BlogSection } from "@/components/blog-section"

export function BlogSectionWrapper() {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <BlogSection />
      </div>
    </section>
  )
}
