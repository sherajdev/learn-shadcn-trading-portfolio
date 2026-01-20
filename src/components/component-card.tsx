import { Badge } from "@/components/ui/badge"

interface ComponentCardProps {
  name: string
  description: string
  useCase: string
  children: React.ReactNode
}

export function ComponentCard({ name, description, useCase, children }: ComponentCardProps) {
  return (
    <div className="border border-border bg-card p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{name}</h3>
          <Badge variant="outline" className="text-xs">Component</Badge>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="py-8 flex items-center justify-center bg-muted/30 border border-border min-h-[120px]">
        {children}
      </div>

      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">When to use:</span> {useCase}
      </p>
    </div>
  )
}
