import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react/dist/ssr"

interface ProjectCardProps {
  title: string
  description: string
  category: string
  image: string
  tags?: string[]
  link?: string
}

export function ProjectCard({
  title,
  description,
  category,
  image,
  tags,
  link = "#",
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden cursor-pointer border-border/50 transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden bg-secondary/50">
        {/* Placeholder for project image */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
              <div className="w-10 h-10 bg-primary/20 rounded" />
            </div>
            <p className="text-xs text-muted-foreground">Project Image</p>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="lg" asChild>
            <a href={link}>
              View Project <ArrowRight className="ml-2" weight="bold" />
            </a>
          </Button>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="w-fit">
            {category}
          </Badge>
          <ArrowUpRight
            className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            weight="bold"
          />
        </div>

        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-md bg-secondary text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>
    </Card>
  )
}
