interface SkillBarProps {
  name: string
  percentage: number
}

export function SkillBar({ name, percentage }: SkillBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
