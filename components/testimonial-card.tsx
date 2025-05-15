import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  avatarUrl: string
}

export function TestimonialCard({ quote, author, position, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <img src={avatarUrl || "/placeholder.svg"} alt={author} className="h-full w-full object-cover" />
          </div>
          <div>
            <h4 className="font-semibold">{author}</h4>
            <p className="text-sm text-muted-foreground">{position}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-2 border-muted pl-4 italic">"{quote}"</blockquote>
      </CardContent>
    </Card>
  )
}
