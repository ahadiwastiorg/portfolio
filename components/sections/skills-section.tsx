import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillBar } from "@/components/skill-bar"

export function SkillsSection() {
  return (
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
  )
}
