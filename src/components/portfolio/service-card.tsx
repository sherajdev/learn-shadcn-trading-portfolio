import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Icon } from "@phosphor-icons/react"

interface ServiceCardProps {
  icon: Icon
  title: string
  subtitle: string
  description: string
}

export function ServiceCard({
  icon: IconComponent,
  title,
  subtitle,
  description,
}: ServiceCardProps) {
  return (
    <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg border-border/50">
      <CardHeader>
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <IconComponent className="w-7 h-7 text-primary" weight="duotone" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base font-medium text-foreground/70">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
