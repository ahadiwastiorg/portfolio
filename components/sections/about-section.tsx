import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Code2,
  Coffee,
  Container,
  Database,
  Globe,
  GraduationCap,
  Heart,
  Languages,
  MapPin,
  Rocket,
  Target,
  Users,
  Workflow,
} from "lucide-react";

const achievements = [
  {
    icon: Calendar,
    label: "Years Experience",
    value: "8+",
    description:
      "Professional software development across fintech, telecom, and enterprise solutions",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Rocket,
    label: "Projects Delivered",
    value: "50+",
    description:
      "End-to-end project delivery from conception to production deployment",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Code2,
    label: "Technologies Mastered",
    value: "25+",
    description:
      "Modern web technologies, cloud platforms, and development frameworks",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    label: "Team Members Led",
    value: "20+",
    description:
      "Cross-functional teams across multiple projects and organizations",
    color: "from-orange-500 to-red-500",
  },
];

const skills = [
  { name: "Full-Stack Development", level: 99, icon: Code2 },
  { name: "Cloud Architecture", level: 99, icon: Globe },
  { name: "Team Leadership", level: 99, icon: Users },
  { name: "System Design", level: 99, icon: Target },
  { name: "Microservices", level: 99, icon: Workflow },
  { name: "DevOps Practices", level: 99, icon: Container },
  { name: "Database Management", level: 99, icon: Database },
];

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

const languages = [
  { name: "Urdu", level: "Native", flag: "🇵🇰", proficiency: 100 },
  { name: "Hindi", level: "Fluent", flag: "🇮🇳", proficiency: 80 },
  { name: "English", level: "Fluent", flag: "🇺🇸", proficiency: 95 },
  
];

const certifications = [
  {
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    verified: true,
  },
  {
    name: "Docker Certified Associate",
    issuer: "Docker Inc.",
    year: "2022",
    verified: true,
  },
  { name: "React Specialist", issuer: "Meta", year: "2023", verified: true },
  {
    name: "Kubernetes Administrator",
    issuer: "CNCF",
    year: "2023",
    verified: false,
  },
];

const education = [
  {
    degree: "Bachelor's Degree in Computer Sciences",
    institution: "PMAS University of Information and Technology",
    location: "Rawalpindi, Pakistan",
    period: "2012-2016",
    grade: "First Class Honors",
    highlights: [
      "Software Engineering",
      "Data Structures & Algorithms",
      "Database Systems",
      "Web Technologies",
    ],
  },
  {
    degree: "Pre-Engineering",
    institution: "Punjab College of Information and Technology",
    location: "Rawalpindi, Pakistan",
    period: "2012",
    grade: "Distinction",
    highlights: ["Mathematics", "Physics", "Computer Science Fundamentals"],
  },
  {
    degree: "English Access Training",
    institution: "U.S. Embassy Pakistan",
    location: "Islamabad, Pakistan",
    period: "2007",
    grade: "Certificate of Excellence",
    highlights: [
      "Advanced English Communication",
      "Cultural Exchange",
      "Leadership Skills",
    ],
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/30 to-background"
    >
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              About Me
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              My Journey & Passion
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              A passionate software engineer with expertise in full-stack
              development, microservices, and cloud technologies. I transform
              complex business requirements into scalable, user-centric
              solutions.
            </p>
          </div>
        </div>

        {/* Achievement Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20 overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${achievement.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {achievement.value}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {achievement.label}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Core Skills */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Core Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {chunkArray(skills, 4).map((skillsChunk, colIdx) => (
                    <div key={colIdx} className="space-y-4">
                      {skillsChunk.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <skill.icon className="h-4 w-4 text-primary" />
                              <span className="font-medium">{skill.name}</span>
                            </div>
                            {/* <span className="text-sm text-muted-foreground">{skill.level}%</span> */}
                          </div>
                          {/* <Progress value={skill.level} className="h-2" /> */}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {chunkArray(languages, 2).map((langChunk, rowIdx) => (
                    <div key={rowIdx} className="space-y-4">
                      {langChunk.map((lang, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{lang.flag}</span>
                              <div>
                                <div className="font-medium">{lang.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {lang.level}
                                </div>
                              </div>
                            </div>
                            {/* <Badge variant="outline">{lang.proficiency}%</Badge> */}
                          </div>
                          {/* <Progress value={lang.proficiency} className="h-1.5" /> */}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personal Interests */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Beyond Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Coffee className="h-4 w-4 text-amber-500" />
                    <span>Coffee Enthusiast</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>Tech Blogger</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-green-500" />
                    <span>Mentor</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Rocket className="h-4 w-4 text-purple-500" />    
                    <span>Innovation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Education */}     
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Education & Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative">
                    {index < education.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-border" />
                    )}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-semibold text-primary">
                            {edu.degree}
                          </h4>
                          <p className="text-sm font-medium">
                            {edu.institution}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {edu.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {edu.period}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {edu.grade}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {edu.highlights.map((highlight, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            {/* <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certifications & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {cert.name}
                          {cert.verified && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.year}
                        </div>
                      </div>
                    </div>
                    <Badge variant={cert.verified ? "default" : "secondary"}>
                      {cert.verified ? "Verified" : "In Progress"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card> */}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
            <CardContent className="pt-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  Let's Build Something Amazing Together
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  I'm always excited to work on challenging projects and
                  collaborate with talented teams. Whether you need a technical
                  consultant, a team lead, or a full-stack developer, let's
                  connect!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Badge variant="outline" className="px-4 py-2">
                    <Coffee className="h-4 w-4 mr-2" />
                    Available for Coffee Chats
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <Users className="h-4 w-4 mr-2" />
                    Open to Mentoring
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <Rocket className="h-4 w-4 mr-2" />
                    Ready for New Challenges
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
