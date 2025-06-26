import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, Code2, Rocket, Star, MapPin, Calendar } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "Dubai, UAE",
    period: "2022 - Present",
    type: "Full-time",
    current: true,
    icon: Building2,
    description:
      "Leading full-stack development initiatives and architecting scalable microservices solutions. Spearheading digital transformation projects that serve 500K+ active users.",
    achievements: [
      "Architected and deployed 15+ microservices handling 1M+ daily requests",
      "Led a team of 8 developers in delivering $2M+ worth of projects",
      "Reduced system latency by 40% through performance optimization",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
    ],
    technologies: ["React", "Node.js", "Golang", "AWS", "Docker", "Kubernetes", "MongoDB", "PostgreSQL"],
    highlights: ["Team Leadership", "System Architecture", "Performance Optimization"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Dubai, UAE",
    period: "2020 - 2022",
    type: "Full-time",
    current: false,
    icon: TrendingUp,
    description:
      "Developed and maintained complex web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    achievements: [
      "Built 12+ responsive web applications with 99.9% uptime",
      "Integrated 20+ third-party APIs and payment gateways",
      "Mentored 5 junior developers and conducted code reviews",
      "Improved application performance by 35% through code optimization",
    ],
    technologies: ["Vue.js", "React", "Express.js", "MySQL", "Redis", "AWS", "Git"],
    highlights: ["Frontend Development", "API Integration", "Mentoring"],
  },
  {
    id: 3,
    title: "Software Developer",
    company: "Digital Solutions Ltd",
    location: "Karachi, Pakistan",
    period: "2018 - 2020",
    type: "Full-time",
    current: false,
    icon: Code2,
    description:
      "Focused on frontend development and user experience optimization. Worked closely with design teams to implement pixel-perfect interfaces and interactive features.",
    achievements: [
      "Developed 25+ responsive web interfaces with modern UI/UX",
      "Reduced page load times by 50% through optimization techniques",
      "Implemented automated testing reducing bugs by 30%",
      "Collaborated with 3 design teams on 10+ major projects",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Bootstrap", "jQuery", "PHP", "MySQL"],
    highlights: ["UI/UX Implementation", "Performance Optimization", "Cross-browser Compatibility"],
  },
  {
    id: 4,
    title: "Junior Developer",
    company: "StartupHub",
    location: "Islamabad, Pakistan",
    period: "2016 - 2018",
    type: "Full-time",
    current: false,
    icon: Rocket,
    description:
      "Started my professional journey contributing to various web development projects. Gained hands-on experience with multiple technologies and development methodologies.",
    achievements: [
      "Contributed to 15+ web development projects",
      "Learned and implemented 8+ new technologies",
      "Participated in agile development processes",
      "Maintained 95%+ code quality standards",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress", "MySQL"],
    highlights: ["Learning & Growth", "Web Development", "Team Collaboration"],
  },
]

export function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Timeline line - hidden on mobile */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block" />

      <div className="space-y-8">
        {experiences.map((exp, index) => {
          const IconComponent = exp.icon
          return (
            <div key={exp.id} className="relative">
              {/* Timeline dot - hidden on mobile */}
              <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-background hidden md:block" />

              {/* Experience Card */}
              <div className="md:ml-20">
                <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-gradient-to-b from-blue-500 to-purple-500">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                          <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {exp.title}
                            </CardTitle>
                            {exp.current && (
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              <span className="font-medium">{exp.company}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                    {/* Key Highlights */}
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Key Specializations:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Key Achievements:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs hover:bg-primary/10 transition-colors cursor-default"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
