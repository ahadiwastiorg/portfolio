import { HeroSection } from "@/components/sections/hero-section"
import { GitHubStatsSection } from "@/components/sections/github-stats-section"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CodeSection } from "@/components/sections/code-section"
import { BlogSectionWrapper } from "@/components/sections/blog-section"
import { CoursesPreviewSection } from "@/components/sections/courses-preview-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Syed Abdul Hadi - Senior Software Engineer Dubai | Full Stack Developer UAE",
  description:
    "Syed Abdul Hadi (Abdul Hadi Wasti) - Senior Software Engineer in Dubai, UAE with 8+ years experience. Expert in React, Node.js, Golang, AWS, Docker, Kubernetes. Available for consulting and full-time opportunities in Dubai.",
  keywords: [
    "Syed Abdul Hadi",
    "Abdul Hadi",
    "Abdul",
    "Hadi",
    "Syed",
    "Wasti",
    "Abdul Hadi Wasti",
    "Senior Software Engineer Dubai",
    "Software Engineer Dubai",
    "Full Stack Developer Dubai",
    "React Developer Dubai",
    "Node.js Developer Dubai",
    "Golang Developer Dubai",
    "AWS Certified Dubai",
    "Docker Expert Dubai",
    "Kubernetes Dubai",
    "Software Engineer UAE",
    "Dubai Tech Professional",
    "Senior Developer Dubai",
  ].join(", "),
  openGraph: {
    title: "Syed Abdul Hadi - Senior Software Engineer Dubai",
    description:
      "Senior Software Engineer in Dubai with 8+ years experience in React, Node.js, Golang, AWS. Expert in full-stack development and cloud architecture.",
    url: "https://syedabdulhadi.dev",
    siteName: "Syed Abdul Hadi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Abdul Hadi - Senior Software Engineer Dubai",
    description: "Senior Software Engineer in Dubai with 8+ years experience in React, Node.js, Golang, AWS.",
  },
  alternates: {
    canonical: "https://syedabdulhadi.dev",
  },
}

export default function HomePage() {
  return (
    <>
      {/* Hidden SEO Content for Name Variations */}
      <div className="sr-only">
        <h1>Syed Abdul Hadi - Senior Software Engineer Dubai UAE</h1>
        <h2>Abdul Hadi Wasti - Full Stack Developer Dubai</h2>
        <h3>Abdul Hadi - React Node.js Golang Expert Dubai</h3>
        <p>
          Syed Abdul Hadi, also known as Abdul Hadi Wasti or simply Abdul Hadi, is a Senior Software Engineer based in
          Dubai, UAE. With over 8 years of professional experience, Abdul specializes in full-stack development using
          React, Node.js, Golang, and AWS cloud technologies. Hadi has worked with leading companies in Dubai and is
          available for consulting and full-time opportunities. Syed Wasti brings expertise in microservices
          architecture, cloud computing, and team leadership to every project.
        </p>
        <p>
          Keywords: Syed Abdul Hadi Dubai, Abdul Hadi software engineer, Hadi developer UAE, Syed Wasti tech lead, Abdul
          Hadi Wasti portfolio, senior developer Dubai, React expert Dubai, Node.js specialist UAE, Golang developer
          Dubai, AWS certified Dubai, full stack engineer UAE, software architect Dubai, tech consultant Dubai, senior
          software engineer UAE, Dubai software developer, UAE tech professional
        </p>
      </div>

      <Header />
      <main>
        <HeroSection />
        <GitHubStatsSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CodeSection />
        <BlogSectionWrapper />
        <CoursesPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
