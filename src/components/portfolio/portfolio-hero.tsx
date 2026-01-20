import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortfolioStats } from "./portfolio-stats"
import { Icon } from "@phosphor-icons/react"
import { EnvelopeSimple, ArrowRight } from "@phosphor-icons/react/dist/ssr"

interface PortfolioHeroProps {
  name: string
  title: string
  tagline: string
  description: string
  stats: Array<{ label: string; value: string; icon: Icon }>
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
}

export function PortfolioHero({
  name,
  title,
  tagline,
  description,
  stats,
  primaryCta,
  secondaryCta,
}: PortfolioHeroProps) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-6">
          <Badge variant="secondary" className="w-fit">
            {tagline}
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hey, I'm {name} — A{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent italic">
                {title}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {description}
            </p>
          </div>

          {/* Stats Grid */}
          <PortfolioStats stats={stats} />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <a href={primaryCta.href}>
                <EnvelopeSimple className="mr-2" weight="bold" />
                {primaryCta.text}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={secondaryCta.href}>
                {secondaryCta.text}
                <ArrowRight className="ml-2" weight="bold" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="relative lg:order-last order-first">
          {/* Gradient blob background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

          {/* Placeholder for hero image */}
          <div className="relative aspect-square max-w-[500px] mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center border border-border">
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full" />
              </div>
              <p className="text-sm text-muted-foreground">
                Replace with your hero image
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
