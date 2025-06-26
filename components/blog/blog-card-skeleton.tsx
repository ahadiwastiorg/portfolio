import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BlogCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-video w-full bg-muted rounded-t-lg animate-pulse" />
      <CardHeader className="flex-1">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-6 w-full bg-muted rounded animate-pulse mb-2" />
        <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-4" />
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-14 bg-muted rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-6 w-24 bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  )
}
