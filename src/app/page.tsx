import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { ComponentCard } from "@/components/component-card"

import { ButtonDemo } from "@/components/showcase/button-demo"
import { CardDemo } from "@/components/showcase/card-demo"
import { BadgeDemo } from "@/components/showcase/badge-demo"
import { AlertDemo } from "@/components/showcase/alert-demo"
import { TabsDemo } from "@/components/showcase/tabs-demo"
import { AccordionDemo } from "@/components/showcase/accordion-demo"
import { AvatarDemo } from "@/components/showcase/avatar-demo"
import { ProgressDemo } from "@/components/showcase/progress-demo"
import { SwitchDemo } from "@/components/showcase/switch-demo"
import { DialogDemo } from "@/components/showcase/dialog-demo"

const components = [
  {
    name: "Button",
    description: "The most fundamental interactive element. Triggers actions when clicked.",
    useCase: "Form submissions, navigation, triggering modals.",
    demo: <ButtonDemo />,
  },
  {
    name: "Card",
    description: "A container that groups related content and actions together.",
    useCase: "Product displays, user profiles, content previews.",
    demo: <CardDemo />,
  },
  {
    name: "Badge",
    description: "Small status descriptors for UI elements.",
    useCase: "Status indicators, counts, labels, tags.",
    demo: <BadgeDemo />,
  },
  {
    name: "Alert",
    description: "Displays important messages that require user attention.",
    useCase: "Form validation, system notifications, warnings.",
    demo: <AlertDemo />,
  },
  {
    name: "Tabs",
    description: "Organizes content into separate views within the same context.",
    useCase: "Settings pages, dashboards, content organization.",
    demo: <TabsDemo />,
  },
  {
    name: "Accordion",
    description: "Vertically stacked list of expandable/collapsible content sections.",
    useCase: "FAQs, documentation, progressive disclosure.",
    demo: <AccordionDemo />,
  },
  {
    name: "Avatar",
    description: "Represents a user or entity with an image or fallback initials.",
    useCase: "User profiles, comments, team member lists.",
    demo: <AvatarDemo />,
  },
  {
    name: "Progress",
    description: "Displays completion status of a task or process.",
    useCase: "File uploads, onboarding flows, loading states.",
    demo: <ProgressDemo />,
  },
  {
    name: "Switch",
    description: "Toggle control for binary on/off states.",
    useCase: "Settings toggles, feature flags, preferences.",
    demo: <SwitchDemo />,
  },
  {
    name: "Dialog",
    description: "Overlay window that requires user interaction before returning to main content.",
    useCase: "Confirmations, forms, detailed views.",
    demo: <DialogDemo />,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />

        <section id="components" className="py-16 md:py-24 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Component Showcase
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore 10 essential shadcn/ui components with live interactive demos.
                Each component is accessible, customizable, and production-ready.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {components.map((component) => (
                <ComponentCard
                  key={component.name}
                  name={component.name}
                  description={component.description}
                  useCase={component.useCase}
                >
                  {component.demo}
                </ComponentCard>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
