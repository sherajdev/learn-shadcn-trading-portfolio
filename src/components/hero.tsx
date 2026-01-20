import { ArrowRight, GithubLogo } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="text-sm">
            Learning shadcn/ui
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">
            Explore{" "}
            <span className="text-primary">shadcn/ui</span>{" "}
            Components
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            A hands-on showcase of beautifully designed, accessible components
            built with Base UI and Tailwind CSS. Learn by example.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <a href="#components">
                View Components
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://ui.shadcn.com/docs" target="_blank" rel="noopener noreferrer">
                <GithubLogo className="mr-2 h-4 w-4" />
                Documentation
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary" />
              <span>10 Components</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary" />
              <span>Fully Interactive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary" />
              <span>Dark Mode</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
