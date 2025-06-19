import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Axiom Telecommunication",
    location: "Dubai, UAE",
    period: "Oct 2019 - Present",
    description:
      "Conceive and build responsive and adaptive solutions while ensuring the technical feasibility of business case. Update, maintain and adhere to pattern-libraries, style guides, and site documentation.",
    achievements: [
      "Optimized application for maximum speed and scalability",
      "Worked with agile team to develop, test, deploy and maintain",
      "Written services for role-based authentication control",
      "Collaborated on product grooming, planning, execution and review",
    ],
    technologies: ["React", "Node.js", "Microservices", "AWS", "Docker"],
  },
  {
    title: "Software Engineer",
    company: "Mashreq Bank",
    location: "Dubai, UAE",
    period: "May 2019 - Oct 2019",
    description:
      "Workflow automation for digital on boarding process. Optimize applications for maximum speed and Best practices using CI/CD pipeline.",
    achievements: [
      "Implemented workflow automation for digital onboarding",
      "Optimized applications using CI/CD pipeline",
      "Collaborated with back-end developers and web designers",
      "Built solutions based on user and customer feedback",
    ],
    technologies: ["Vue.js", "Express", "MySQL", "CI/CD", "Docker"],
  },
  {
    title: "Senior Software Engineer",
    company: "Micronox Systems",
    location: "Pakistan",
    period: "Jan 2018 - Feb 2019",
    description:
      "Providing technical input in application design and cloud native development. Assisting in maintenances and upgrades of existing applications.",
    achievements: [
      "Provided technical input in application design",
      "Participated in design reviews and recommended improvements",
      "Analyzed and troubleshot application issues",
      "Developed effective technical and creative solutions",
    ],
    technologies: ["Angular", "Node.js", "AWS", "MongoDB", "Docker"],
  },
  {
    title: "Software Engineer",
    company: "Micronox Systems",
    location: "Pakistan",
    period: "Oct 2016 - Jan 2018",
    description:
      "Developing web applications in Angular4+ and hybrid mobile applications using Ionic. Actively participating in update and maintenance activities.",
    achievements: [
      "Developed web applications in Angular4+",
      "Built hybrid mobile applications using Ionic",
      "Implemented AWS deployment with EC2, S3 and Lambda",
      "Worked with cross-functional teams on software maintenance",
    ],
    technologies: ["Angular", "Ionic", "AWS", "Lambda", "S3"],
  },
  {
    title: "Assistant Software Engineer",
    company: "Micronox Systems",
    location: "Pakistan",
    period: "Mar 2016 - Oct 2016",
    description:
      "Website Development in Laravel, WordPress and core PHP. Assists in the design, coding, and testing of technical solutions.",
    achievements: [
      "Developed websites using Laravel and WordPress",
      "Applied standard systems development life cycle processes",
      "Adhered to coding standards defined by technical management",
      "Established responsible deadlines and personal work plans",
    ],
    technologies: ["Laravel", "WordPress", "PHP", "MySQL"],
  },
]

export function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background md:left-1/2 md:-translate-x-2" />

            <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-1/2 md:mr-8" : "md:pl-1/2 md:ml-8"}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary">{exp.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      Current
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
