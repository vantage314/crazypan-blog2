import { Eye } from "lucide-react"

interface ViewCounterProps {
  views: number
}

export default function ViewCounter({ views }: ViewCounterProps) {
  return (
    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>{views} 次阅读</span>
    </div>
  )
}
