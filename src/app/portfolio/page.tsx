import type { Metadata } from "next"
import { PortfolioHeader } from "@/components/portfolio/portfolio-header"
import { PortfolioHero } from "@/components/portfolio/portfolio-hero"
import { ServicesSection } from "@/components/portfolio/services-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { TestimonialsSection } from "@/components/portfolio/testimonials-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { portfolioData } from "@/lib/portfolio-data"

export const metadata: Metadata = {
  title: "Portfolio | Milton - UI/UX Designer & Developer",
  description:
    "Explore my portfolio of modern, user-focused web and mobile applications. UI/UX design services specializing in clean, functional interfaces.",
  openGraph: {
    title: "Portfolio | Milton - UI/UX Designer",
    description: "Modern UI/UX design portfolio showcasing web and mobile applications",
  },
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHeader />
      <main className="min-h-screen">
        {/* Hero Section */}
        <PortfolioHero {...portfolioData.hero} />

        {/* Services Section */}
        <ServicesSection services={portfolioData.services} />

        {/* Portfolio Section */}
        <ProjectsSection projects={portfolioData.projects} />

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={portfolioData.testimonials} />

        {/* Contact Section */}
        <ContactSection
          email={portfolioData.contact.email}
          phone={portfolioData.contact.phone}
          socialLinks={portfolioData.socialLinks}
        />
      </main>
    </>
  )
}
