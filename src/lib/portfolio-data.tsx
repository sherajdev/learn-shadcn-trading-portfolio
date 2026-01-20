import {
  TrendUp,
  CheckCircle,
  Globe,
  PenNib,
  DeviceMobile,
  Desktop,
  Sparkle,
  LinkedinLogo,
  TwitterLogo,
  GithubLogo,
  Envelope,
  Star,
} from "@phosphor-icons/react/dist/ssr"

export const portfolioData = {
  hero: {
    name: "Milton",
    title: "UI/UX Designer",
    tagline: "Crafting clean, user-focused experiences",
    description:
      "I design modern, user-first interfaces that turn ideas into smooth, functional, and beautiful digital products.",
    stats: [
      { label: "Years Experience", value: "2+", icon: TrendUp },
      { label: "Projects Completed", value: "15+", icon: CheckCircle },
      { label: "Web Apps Designed", value: "50+", icon: Globe },
    ],
    primaryCta: { text: "Get In Touch", href: "#contact" },
    secondaryCta: { text: "Explore Projects", href: "#portfolio" },
  },

  services: [
    {
      icon: PenNib,
      title: "UI/UX Design",
      subtitle: "Design With Purpose",
      description:
        "I craft modern, user-centered interfaces that prioritize usability, clarity, and visual balance — always designed with the end user in mind.",
    },
    {
      icon: DeviceMobile,
      title: "Mobile App Design",
      subtitle: "iPhone, Clear, Visible",
      description:
        "By designing iOS and Android app interfaces with clear hierarchy, easy navigation, and soft visuals brings intuitive feel and intuitive on small screens.",
    },
    {
      icon: Desktop,
      title: "Web App",
      subtitle: "Data-Rich, Yet Simple",
      description:
        "Designing modern, responsive websites that blend clarity, usability, and visual harmony — built to scale and crafted for real users.",
    },
    {
      icon: Sparkle,
      title: "Effortless Experiences",
      subtitle: "Built Through Clarity",
      description:
        "Built Through Clarity, Intention, And Simplicity — every interaction is purposeful, every detail is considered.",
    },
  ],

  projects: [
    {
      title: "ECommerce Management Web App",
      description:
        "UI/UX Design for a comprehensive e-commerce management platform with analytics dashboard and inventory tracking.",
      category: "Web Design",
      image: "/portfolio/projects/ecommerce.png",
      tags: ["UI/UX", "Dashboard", "E-commerce"],
      link: "#",
    },
    {
      title: "Premium Dashboard Analytics",
      description:
        "Modern dashboard design with advanced data visualization and real-time metrics for business intelligence.",
      category: "Dashboard",
      image: "/portfolio/projects/dashboard.png",
      tags: ["Analytics", "Data Viz", "SaaS"],
      link: "#",
    },
    {
      title: "Mobile Banking App",
      description:
        "Clean and intuitive mobile banking interface focused on security and ease of use for daily transactions.",
      category: "Mobile App",
      image: "/portfolio/projects/banking.png",
      tags: ["iOS", "Android", "FinTech"],
      link: "#",
    },
    {
      title: "Project Management Tool",
      description:
        "Collaborative project management platform with task tracking, team communication, and progress visualization.",
      category: "Web Design",
      image: "/portfolio/projects/project-mgmt.png",
      tags: ["Collaboration", "Productivity", "SaaS"],
      link: "#",
    },
    {
      title: "Fitness Tracking App",
      description:
        "Health and fitness mobile app with workout plans, progress tracking, and personalized recommendations.",
      category: "Mobile App",
      image: "/portfolio/projects/fitness.png",
      tags: ["Health", "Mobile", "Wearables"],
      link: "#",
    },
    {
      title: "E-Learning Platform",
      description:
        "Educational platform with course management, video streaming, and interactive learning experiences.",
      category: "Web Design",
      image: "/portfolio/projects/elearning.png",
      tags: ["Education", "Video", "Interactive"],
      link: "#",
    },
  ],

  testimonials: [
    {
      quote:
        "Milton was able to create our vision with precision and creativity. The attention to detail and user experience exceeded our expectations.",
      author: "Sarah Johnson",
      role: "CEO at TechFlow",
      avatar: "/portfolio/testimonials/avatar-1.png",
      rating: 5,
    },
    {
      quote:
        "Working with Milton was seamless. The design quality and turnaround time were outstanding. Highly recommend!",
      author: "Michael Chen",
      role: "Product Manager",
      avatar: "/portfolio/testimonials/avatar-2.png",
      rating: 5,
    },
    {
      quote:
        "The UI/UX work transformed our product. User engagement increased by 40% after the redesign. Exceptional work!",
      author: "Emily Rodriguez",
      role: "Founder at StartupLab",
      avatar: "/portfolio/testimonials/avatar-3.png",
      rating: 5,
    },
    {
      quote:
        "Professional, creative, and always delivers on time. The mobile app design was exactly what we needed.",
      author: "David Kim",
      role: "CTO at InnovateCo",
      avatar: "/portfolio/testimonials/avatar-4.png",
      rating: 5,
    },
    {
      quote:
        "Milton's design skills are top-notch. Created a beautiful and functional dashboard that our team loves using.",
      author: "Jessica Williams",
      role: "Head of Design",
      avatar: "/portfolio/testimonials/avatar-5.png",
      rating: 5,
    },
    {
      quote:
        "Exceptional designer with great communication skills. The project was completed smoothly and the results were amazing.",
      author: "Alex Thompson",
      role: "Marketing Director",
      avatar: "/portfolio/testimonials/avatar-6.png",
      rating: 5,
    },
  ],

  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: LinkedinLogo,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: TwitterLogo,
    },
    {
      name: "GitHub",
      url: "https://github.com",
      icon: GithubLogo,
    },
    {
      name: "Email",
      url: "mailto:contact@example.com",
      icon: Envelope,
    },
  ],

  contact: {
    title: "Let's Connect",
    description:
      "Got a project idea or just want to collaborate? I'm always excited to hear about new opportunities and creative challenges.",
    email: "milton@example.com",
    phone: "+1 (555) 123-4567",
  },
}
