import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBar } from "@/components/skill-bar"
import { TestimonialCard } from "@/components/testimonial-card"
import { ContactForm } from "@/components/contact-form"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="text-xl font-bold">
            John.dev
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
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
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Hi, I'm John Doe
                <span className="block text-primary">Senior Web Developer</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I build exceptional digital experiences with modern web technologies. With over 8 years of experience, I
                specialize in creating robust, scalable, and user-friendly applications.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="#contact">Get in touch</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#projects">View my work</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-primary">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="John Doe"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Link
              href="#about"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary"
            >
              <ChevronDown className="h-6 w-6" />
              <span className="sr-only">Scroll down</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Me</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Journey</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I'm a passionate web developer with a strong background in building complex web applications. My journey
                began 8 years ago, and I've since worked with startups, agencies, and enterprise companies to deliver
                high-quality digital products.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-xl font-bold">Experience</h3>
              <ul className="space-y-4">
                <li className="border-l-2 border-primary pl-4 py-2">
                  <div className="font-semibold">Senior Frontend Developer</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">TechCorp Inc. • 2020 - Present</div>
                  <div className="mt-1">
                    Led development of multiple web applications using React, Next.js, and TypeScript.
                  </div>
                </li>
                <li className="border-l-2 border-muted pl-4 py-2">
                  <div className="font-semibold">Full Stack Developer</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">WebSolutions • 2018 - 2020</div>
                  <div className="mt-1">Developed and maintained client websites and web applications.</div>
                </li>
                <li className="border-l-2 border-muted pl-4 py-2">
                  <div className="font-semibold">Web Developer</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Digital Agency • 2016 - 2018</div>
                  <div className="mt-1">Created responsive websites and implemented frontend features.</div>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-xl font-bold">Education</h3>
              <ul className="space-y-4">
                <li className="border-l-2 border-primary pl-4 py-2">
                  <div className="font-semibold">Master's in Computer Science</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Tech University • 2014 - 2016</div>
                  <div className="mt-1">Specialized in Web Technologies and Software Engineering.</div>
                </li>
                <li className="border-l-2 border-muted pl-4 py-2">
                  <div className="font-semibold">Bachelor's in Computer Science</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">State University • 2010 - 2014</div>
                  <div className="mt-1">Graduated with honors. Focus on programming and algorithms.</div>
                </li>
              </ul>
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-4">Languages</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>English</span>
                    <span>Native</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Spanish</span>
                    <span>Fluent</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>French</span>
                    <span>Basic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Skills</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technical Expertise</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I've worked with a wide range of technologies throughout my career. Here are some of my core
                competencies.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Frontend Development</h3>
              <SkillBar name="React / Next.js" percentage={95} />
              <SkillBar name="TypeScript" percentage={90} />
              <SkillBar name="HTML / CSS" percentage={95} />
              <SkillBar name="Tailwind CSS" percentage={90} />
              <SkillBar name="Redux / Zustand" percentage={85} />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Backend Development</h3>
              <SkillBar name="Node.js" percentage={85} />
              <SkillBar name="Express / NestJS" percentage={80} />
              <SkillBar name="PostgreSQL / MongoDB" percentage={75} />
              <SkillBar name="GraphQL" percentage={70} />
              <SkillBar name="Docker" percentage={65} />
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-8">
            <h3 className="text-xl font-bold mb-6">Other Skills</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Git",
                "CI/CD",
                "Jest",
                "Testing Library",
                "Cypress",
                "Storybook",
                "Figma",
                "Responsive Design",
                "Performance Optimization",
                "SEO",
                "Accessibility",
                "AWS",
                "Vercel",
                "Netlify",
              ].map((skill) => (
                <div key={skill} className="rounded-full bg-muted px-4 py-2 text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Portfolio</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                A selection of my recent work. Each project represents a unique challenge and solution.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="E-commerce Platform"
              description="A full-featured online store with cart, checkout, and payment integration."
              tags={["Next.js", "TypeScript", "Stripe", "Tailwind CSS"]}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
            <ProjectCard
              title="SaaS Dashboard"
              description="Admin dashboard for a subscription-based service with analytics and user management."
              tags={["React", "Redux", "Node.js", "Chart.js"]}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
            <ProjectCard
              title="Real Estate App"
              description="Property listing and search application with map integration and filtering."
              tags={["Next.js", "MongoDB", "Google Maps API", "Tailwind CSS"]}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
            <ProjectCard
              title="Social Media Platform"
              description="A community platform with posts, comments, and real-time notifications."
              tags={["React", "Firebase", "Socket.io", "Styled Components"]}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
            <ProjectCard
              title="Fitness Tracker"
              description="Mobile-first web app for tracking workouts and nutrition with progress visualization."
              tags={["React", "TypeScript", "D3.js", "Node.js"]}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
            <ProjectCard
              title="Content Management System"
              description="Custom CMS for a publishing company with editorial workflow and asset management."
              tags={["Next.js", "GraphQL", "PostgreSQL", "AWS S3"]}
              imageUrl="/placeholder.svg?height=300&width=400"
            />
          </div>
          <div className="flex justify-center">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What People Say</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Feedback from clients and colleagues I've had the pleasure to work with.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="John is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding."
              author="Sarah Johnson"
              position="CTO, TechStart Inc."
              avatarUrl="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="Working with John was a pleasure. He understood our requirements perfectly and delivered a solution that exceeded our expectations."
              author="Michael Chen"
              position="Product Manager, WebSolutions"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="John's technical expertise and ability to translate complex requirements into elegant solutions make him a valuable asset to any team."
              author="Emily Rodriguez"
              position="Lead Developer, Digital Agency"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Contact</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-500 dark:text-gray-400">john@example.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-gray-500 dark:text-gray-400">San Francisco, CA</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Connect</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
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
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
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
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
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
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
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
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </Link>
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
            <Link href="/" className="text-lg font-bold">
              John.dev
            </Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
              Cookies Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
