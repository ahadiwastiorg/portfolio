import { Button } from "@/components/ui/button"
import { ChevronDown, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Abdul Hadi
                </span>
              </h1>
              <h2 className="text-2xl font-semibold text-muted-foreground">Senior Software Engineer in Dubai</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dubai, United Arab Emirates</span>
              </div>

              {/* SEO-focused content */}
              <div className="sr-only">
                <p>Abdul Hadi Wasti, also known as Syed Abdul Hadi or simply Abdul Hadi</p>
                <p>Senior Software Engineer Dubai, Full Stack Developer UAE</p>
                <p>React Expert Dubai, Node.js Specialist Dubai, Golang Developer Dubai</p>
                <p>AWS Certified Professional Dubai, Docker Kubernetes Expert UAE</p>
              </div>
            </div>
            <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300">
              Senior Software Engineer with 8+ years of experience in Dubai, UAE. Expert in React, Golang, and
              AWS cloud technologies. Specializing in full-stack development, microservices architecture, and team
              leadership. Available for consulting and full-time opportunities.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="#contact">Hire Me</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">View My Work</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://www.linkedin.com/in/ahadiwasti/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="mailto:ahadiwasti@gmail.com">
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="tel:+971581987465">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Me
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-600 to-purple-600">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Syed Abdul Hadi - Senior Software Engineer Dubai"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link
            href="#about"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="Scroll to about section"
          >
            <ChevronDown className="h-6 w-6" />
            <span className="sr-only">Scroll down to learn more about Abdul Hadi</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
