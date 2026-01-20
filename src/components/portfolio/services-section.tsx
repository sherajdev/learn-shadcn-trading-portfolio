import { SectionHeader } from "./section-header"
import { ServiceCard } from "./service-card"
import { Button } from "@/components/ui/button"
import { Icon } from "@phosphor-icons/react"
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr"

interface Service {
  icon: Icon
  title: string
  subtitle: string
  description: string
}

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="WHAT I DO"
          description="I help startups, teams, and founders turn ideas into clean, modern, and user-friendly digital experiences — from structure to interface."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <a href="#contact">
              <EnvelopeSimple className="mr-2" weight="bold" />
              Contact Me
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
