import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CodingExamples } from "@/components/coding-examples"

export default function CodePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container px-4 md:px-6 py-16">
          <CodingExamples showAll={true} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
