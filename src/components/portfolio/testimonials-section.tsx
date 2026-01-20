import { SectionHeader } from "./section-header"
import { TestimonialCard } from "./testimonial-card"

interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="TESTIMONIALS"
          description="What clients and collaborators say about working with me"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
