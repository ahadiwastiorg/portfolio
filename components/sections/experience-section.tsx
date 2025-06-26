import { ExperienceTimeline } from "@/components/experience-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Trophy, Calendar } from "lucide-react"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Experience</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Professional Excellence Journey
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              My career progression through various roles and companies, delivering exceptional results and leading
              innovative projects.
            </p>
          </div>
        </div>

        {/* Career Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                8+ Years
              </div>
              <p className="text-sm text-muted-foreground">Professional Development</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-green-600" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                50+
              </div>
              <p className="text-sm text-muted-foreground">Successful Deliveries</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <Users className="h-5 w-5 text-purple-600" />
                Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                20+
              </div>
              <p className="text-sm text-muted-foreground">Team Members Led</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-orange-600" />
                Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                5+
              </div>
              <p className="text-sm text-muted-foreground">Organizations</p>
            </CardContent>
          </Card>
        </div>

        <ExperienceTimeline />
      </div>
    </section>
  )
}
