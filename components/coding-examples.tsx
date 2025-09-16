"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Code, ExternalLink } from "lucide-react"
import { useState } from "react"

const codeExamples = {
  react: {
    title: "Interactive Todo App",
    description: "A fully functional todo app with add, delete, and toggle functionality",
    sandbox: "https://codesandbox.io/p/sandbox/fpppwc",
    code: "NIL",
    language: "React",
    demo: true,
    category: "Frontend",
  },
    algorithm: {
    title: "Sorting Visualizer",
    description: "Interactive bubble sort algorithm with step-by-step visualization",
    sandbox: "https://codesandbox.io/p/devbox/tn3g38",
    code: "NIL",
    language: "NEXT JS",
    demo: true,
    category: "Algorithm",
  },
  calculator: {
    title: "Scientific Calculator",
    description: "A working calculator with basic and scientific operations",
    sandbox: "https://codesandbox.io/p/sandbox/scientific-calculator-vanilla-js-ym3wvn",
    code: "NIL",
    language: "javascript",
    demo: true,
    category: "Interactive",
  },



  golang: {
    title: "Go Microservice",
    description: "Minimal REST API with mux & middleware",
    sandbox: "https://codesandbox.io/p/devbox/tm2cpt?embed=1&file=%2Fmain.go",
    code: "NIL",
    language: "go",
    demo: false,
    category: "Backend",
  },

}

export function CodingExamples({ showAll = true, limit = 3 }) {
  const [activeTab, setActiveTab] = useState("react")
  const [runningDemo, setRunningDemo] = useState<string | null>(null)


  const displayedExamples = showAll ? codeExamples : Object.fromEntries(Object.entries(codeExamples).slice(0, limit))

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: "Code has been copied to clipboard.",
    })
  }

  const runDemo = (key: string) => {
    setRunningDemo(key)
    // In a real implementation, this would execute the code in a sandboxed environment
    toast({
      title: "Demo Running!",
      description: "Code is executing in the preview below.",
    })
  }

  const openInCodepen = (code: string, title: string) => {
    const data = {
      title: title,
      html: '<div id="root"></div>',
      js: code,
      css: "body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }",
      js_external:
        "https://unpkg.com/react@18/umd/react.development.js;https://unpkg.com/react-dom@18/umd/react-dom.development.js",
    }

    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://codepen.io/pen/define"
    form.target = "_blank"

    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "data"
    input.value = JSON.stringify(data)

    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  return (
    <div className="space-y-8">
      {showAll && (
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Interactive Code</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Live Code Examples</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Interactive, testable code examples you can run and modify in real-time.
            </p>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-4">
          {Object.entries(displayedExamples).map(([key, example]) => (
            <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
              {example.title.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(displayedExamples).map(([key, example]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <div className="grid gap-6 lg:grid-cols-1">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        {example.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{example.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {/* <Button variant="outline" size="sm" onClick={() => copyToClipboard(example.code)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      {example.demo && (
                        <Button variant="outline" size="sm" onClick={() => runDemo(key)}>
                          <Play className="h-4 w-4" />
                        </Button>
                      )} */}
                      {/* <Button variant="outline" size="sm" onClick={() => openInCodepen(example.sandbox, example.title)}>
                        <ExternalLink className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="secondary">{example.language}</Badge>
                    <Badge variant="outline">{example.category}</Badge>
                    {example.demo && <Badge variant="default">Interactive</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                    {example.sandbox && (
                    <iframe 
                    src={`${example.sandbox}?view=editor+%2B+preview&module=%2Fsrc%2FApp.tsx&hidenavigation=1`}
                         style={{
                            width: "100%",
                            height: "500px",
                            border: "0",
                            borderRadius: "4px",
                            overflow: "hidden"
                          }}
                        title="TODO"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                      ></iframe>
              )}
                </CardContent>
              </Card>

            
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {!showAll && (
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <a href="/code">
              View All Code Examples
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
