import { SectionHeader } from "./section-header"
import { ProjectCard } from "./project-card"

interface Project {
  title: string
  description: string
  category: string
  image: string
  tags?: string[]
  link?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="portfolio" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="PORTFOLIO"
          description="I offer clean, modern design services that focus on usability, simplicity, and real business value."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
