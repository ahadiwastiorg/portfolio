"use client"

import { useState } from "react"
import { ChevronDown, Github, ExternalLink, MapPin, Phone, Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoginDialog } from "@/components/login-dialog"
import { GitHubStats } from "@/components/github-stats"
import { BlogSection } from "@/components/blog-section"
import { CodingExamples } from "@/components/coding-examples"
import { ContactForm } from "@/components/contact-form"
import { SkillBar } from "@/components/skill-bar"
import { ExperienceTimeline } from "@/components/experience-timeline"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Syed Abdul Hadi
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#experience" className="text-sm font-medium hover:text-primary transition-colors">
              Experience
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="#code" className="text-sm font-medium hover:text-primary transition-colors">
              Code
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <ThemeToggle />
            <LoginDialog isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <LoginDialog isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Button variant="outline" size="icon">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Syed Abdul Hadi
                  </span>
                </h1>
                <h2 className="text-2xl font-semibold text-muted-foreground">Senior Software Engineer</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Dubai, United Arab Emirates</span>
                </div>
              </div>
              <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300">
                Dynamic, detail-oriented, multilingual Software Developer with a programmer's logic and a designer's
                taste. Experienced in React, Vue, Node.js, Golang, and cloud technologies with 8+ years of professional
                experience.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="#contact">Get in touch</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#projects">View my work</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://www.linkedin.com/in/ahadiwasti/" target="_blank">
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
                    Call
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
                    alt="Syed Abdul Hadi"
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
            >
              <ChevronDown className="h-6 w-6" />
              <span className="sr-only">Scroll down</span>
            </Link>
          </div>
        </div>
      </section>

      {/* GitHub Stats */}
      <section className="py-8 bg-muted/30">
        <div className="container px-4 md:px-6">
          <GitHubStats />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Me</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Journey</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                A passionate software engineer with expertise in full-stack development, microservices, and cloud
                technologies.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">8+</span>
                  </div>
                  Years Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional software development experience across various industries and technologies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold">50+</span>
                  </div>
                  Projects Delivered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Successfully delivered projects from conception to deployment across web and mobile platforms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">15+</span>
                  </div>
                  Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Proficient in modern web technologies, cloud platforms, and development tools.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold mb-4">Education</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 py-2">
                  <div className="font-semibold">Bachelor's Degree in Computer Sciences</div>
                  <div className="text-sm text-muted-foreground">
                    PMAS University of Information and Technology • 2012-2016
                  </div>
                  <div className="mt-1 text-sm">Rawalpindi, Pakistan</div>
                </div>
                <div className="border-l-2 border-muted pl-4 py-2">
                  <div className="font-semibold">Pre-Engineering</div>
                  <div className="text-sm text-muted-foreground">
                    Punjab College of Information and Technology • 2012
                  </div>
                </div>
                <div className="border-l-2 border-muted pl-4 py-2">
                  <div className="font-semibold">English Access Training</div>
                  <div className="text-sm text-muted-foreground">U.S. Embassy Pakistan • 2007</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Languages</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Urdu</span>
                  <Badge variant="secondary">Native</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">English</span>
                  <Badge variant="secondary">Fluent</Badge>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Certifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">AWS Certified</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Docker Certified</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">React Specialist</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Experience</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Professional Journey</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                My career progression through various roles and companies.
              </p>
            </div>
          </div>
          <ExperienceTimeline />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Skills</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Expertise</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Technologies and tools I work with to build exceptional software solutions.
              </p>
            </div>
          </div>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="tools">Tools & Cloud</TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <SkillBar name="React JS" percentage={95} />
                  <SkillBar name="Vue JS" percentage={90} />
                  <SkillBar name="TypeScript" percentage={85} />
                  <SkillBar name="HTML/CSS" percentage={95} />
                </div>
                <div className="space-y-4">
                  <SkillBar name="Angular" percentage={80} />
                  <SkillBar name="Ionic" percentage={75} />
                  <SkillBar name="Responsive Design" percentage={90} />
                  <SkillBar name="UI/UX Design" percentage={80} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="backend" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <SkillBar name="Node.js" percentage={90} />
                  <SkillBar name="Express.js" percentage={85} />
                  <SkillBar name="Golang" percentage={80} />
                  <SkillBar name="Beego Framework" percentage={75} />
                </div>
                <div className="space-y-4">
                  <SkillBar name="Gin Framework" percentage={75} />
                  <SkillBar name="Microservices" percentage={85} />
                  <SkillBar name="RESTful APIs" percentage={90} />
                  <SkillBar name="GraphQL" percentage={70} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="database" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <SkillBar name="MySQL" percentage={85} />
                  <SkillBar name="MongoDB" percentage={80} />
                  <SkillBar name="PostgreSQL" percentage={75} />
                </div>
                <div className="space-y-4">
                  <SkillBar name="Redis" percentage={70} />
                  <SkillBar name="Database Design" percentage={85} />
                  <SkillBar name="Query Optimization" percentage={80} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <SkillBar name="Docker" percentage={85} />
                  <SkillBar name="AWS" percentage={80} />
                  <SkillBar name="Git" percentage={90} />
                  <SkillBar name="CI/CD" percentage={75} />
                </div>
                <div className="space-y-4">
                  <SkillBar name="Kubernetes" percentage={70} />
                  <SkillBar name="Jenkins" percentage={65} />
                  <SkillBar name="VS Code" percentage={95} />
                  <SkillBar name="Agile/Scrum" percentage={85} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Portfolio</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                A showcase of my recent work and contributions.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Telecom Management System"
                  className="h-full w-full object-cover transition-all group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Telecom Management System</CardTitle>
                <CardDescription>
                  Enterprise-level telecom management platform built with React and Node.js
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">AWS</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="#" target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Banking Workflow Automation"
                  className="h-full w-full object-cover transition-all group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Banking Workflow Automation</CardTitle>
                <CardDescription>Digital onboarding process automation for Mashreq Bank</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Vue.js</Badge>
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">MySQL</Badge>
                  <Badge variant="secondary">Docker</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="#" target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Microservices Architecture"
                  className="h-full w-full object-cover transition-all group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Microservices Platform</CardTitle>
                <CardDescription>Scalable microservices architecture with Golang and Docker</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Golang</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="secondary">etcd</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="#" target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <BlogSection />
        </div>
      </section>

      {/* Coding Examples Section */}
      <section id="code" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <CodingExamples />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Contact</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Let's discuss your next project or potential collaboration opportunities.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">+971 581987465</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">ahadiwasti@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">Dubai, United Arab Emirates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Linkedin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <Link
                      href="https://www.linkedin.com/in/ahadiwasti/"
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/in/ahadiwasti
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Syed Abdul Hadi
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Syed Abdul Hadi. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
