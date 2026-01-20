# shadcn/ui Component Showcase

A comprehensive learning project showcasing shadcn/ui components, a full-featured dashboard, and a modern portfolio landing page built with Next.js, Tailwind CSS, and Base UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-cyan)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

**[Live Demo](https://shadcn-showcase.vercel.app/)**

## Preview

<p align="center">
  <img src="screenshots/light-mode.png" alt="Light Mode" width="45%">
  <img src="screenshots/dark-mode.png" alt="Dark Mode" width="45%">
</p>

### Component Demos

<p align="center">
  <img src="screenshots/components-ss.png" alt="Component Demos" width="80%">
</p>

### Dashboard

<p align="center">
  <img src="screenshots/dashboard-ss.png" alt="Dashboard" width="80%">
</p>

### Portfolio

<p align="center">
  <img src="screenshots/portfolio-ss.png" alt="Portfolio Landing Page" width="80%">
</p>

## Features

- 10 interactive component demos with explanations
- **Dashboard page** with sidebar, charts, and data tables
- **Portfolio landing page** with hero, services, projects, testimonials, and contact sections
- Dark/light mode toggle
- Responsive grid layout
- Fully accessible components

## Components Showcased

| Component | Description |
|-----------|-------------|
| Button | Interactive buttons with multiple variants and sizes |
| Card | Content container with header, body, and footer |
| Badge | Status indicators and labels |
| Alert | Notification messages (info, success, warning, error) |
| Tabs | Tabbed content organization |
| Accordion | Expandable/collapsible content sections |
| Avatar | User profile images with fallbacks |
| Progress | Progress bars with animations |
| Switch | Toggle controls for settings |
| Dialog | Modal windows for forms and confirmations |

## Dashboard

The project includes a fully functional dashboard at `/dashboard` demonstrating:

- **Collapsible Sidebar** - Navigation with expandable sections
- **Stat Cards** - Metric cards with trend indicators
- **Area Chart** - Visitor analytics with date range filtering
- **Data Table** - Sortable, filterable table with pagination
- **Responsive Layout** - Adapts to mobile, tablet, and desktop

## Portfolio

A modern portfolio landing page at `/portfolio` showcasing:

- **Hero Section** - Gradient title, stats grid (experience, projects, apps), and dual CTAs
- **Services Section** - 4 service cards highlighting UI/UX design capabilities
- **Projects Section** - Portfolio grid with 6 project cards and hover overlays
- **Testimonials Section** - Client testimonials with star ratings and avatars
- **Contact Section** - Contact form with validation, social links, and contact info
- **Fully Responsive** - Mobile-first design adapting to all screen sizes

## Theme Configuration

| Setting | Value |
|---------|-------|
| Style | Maia |
| Base Color | Zinc |
| Accent | Cyan |
| Font | DM Sans |
| Icons | Phosphor |
| Radius | None (sharp corners) |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the showcase.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with theme provider
│   ├── page.tsx          # Main landing page
│   ├── globals.css       # Theme CSS variables
│   ├── dashboard/        # Dashboard route
│   │   ├── layout.tsx    # Dashboard layout with sidebar
│   │   └── page.tsx      # Dashboard page
│   └── portfolio/        # Portfolio route
│       └── page.tsx      # Portfolio landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── showcase/         # Component demo implementations
│   ├── dashboard/        # Dashboard-specific components
│   ├── portfolio/        # Portfolio-specific components
│   ├── header.tsx        # Site header with nav
│   ├── hero.tsx          # Hero section
│   ├── footer.tsx        # Site footer
│   └── component-card.tsx # Demo wrapper component
└── lib/
    ├── utils.ts          # Utility functions
    ├── dashboard-data.ts # Mock data for dashboard
    └── portfolio-data.tsx # Portfolio content data
```

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Phosphor Icons](https://phosphoricons.com/) - Icon library
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## License

MIT
