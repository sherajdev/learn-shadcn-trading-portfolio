import { SectionHeader } from "./section-header"
import { ContactForm } from "./contact-form"
import { Button } from "@/components/ui/button"
import { Icon } from "@phosphor-icons/react"
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr"

interface SocialLink {
  name: string
  url: string
  icon: Icon
}

interface ContactSectionProps {
  email: string
  phone: string
  socialLinks: SocialLink[]
}

export function ContactSection({
  email,
  phone,
  socialLinks,
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="LET'S CONNECT"
          description="Got a project idea or just want to collaborate? I'm always excited to hear about new opportunities and creative challenges."
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">
          {/* Left: Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in touch</h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <EnvelopeSimple className="w-5 h-5 text-primary" weight="bold" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-5 h-5 text-primary" weight="bold" />
                  <a
                    href={`tel:${phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Follow Me
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="w-10 h-10"
                      asChild
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.name}
                      >
                        <IconComponent className="w-5 h-5" weight="bold" />
                      </a>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Visual element placeholder */}
            <div className="mt-8 aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center border border-border">
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Contact image placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
