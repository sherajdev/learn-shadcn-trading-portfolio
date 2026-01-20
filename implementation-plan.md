# Portfolio Landing Page - Implementation Plan

## 📋 Overview

Create a modern, professional portfolio landing page inspired by the Milton UI/UX Designer design, leveraging the existing shadcn/ui components, OKLCH color system, and Next.js 16 architecture.

---

## 🎨 Design Analysis

### Design Inspiration Breakdown

**From Reference Image:**
1. **Hero Section** - Split layout with text left, image right
   - Logo & navigation
   - Headline with styled text (gradient/italic)
   - Stats grid (Years, Projects, Apps)
   - Dual CTAs (primary + secondary)
   - Large hero image with purple gradient blob

2. **What I Do Section** - Service cards showcase
   - Section title + description
   - 3-4 service cards with icons
   - Hover effects and visual hierarchy

3. **Portfolio Section** - Project showcase
   - Grid of project cards
   - Project thumbnails
   - Hover states with descriptions
   - Category filtering (optional)

4. **Testimonials Section** - Social proof
   - Customer/client testimonial cards
   - Avatars + names + ratings

5. **Contact Section** - CTA + form
   - Contact form
   - Social links
   - Visual element (image/illustration)

---

## 🎯 Adaptation to Current Codebase

### Theme Mapping

**Colors from Codebase:**
- Primary (Blue): `oklch(0.715 0.143 215.221)` → Use for CTAs, accents, links
- Secondary (Gray): `oklch(0.967 0.001 285.823)` → Use for cards, backgrounds
- Foreground: `oklch(0.141 0.005 285.823)` → Use for text
- Muted: `oklch(0.552 0.016)` → Use for descriptions

**Design System:**
- Typography: DM Sans (already configured)
- Icons: Phosphor Icons (already installed)
- Components: shadcn/ui (23 components available)
- Border Radius: 0rem (sharp corners - modern aesthetic)

### Component Reusability Matrix

| Design Element | Existing Component | Customization Needed |
|----------------|-------------------|---------------------|
| Navigation | `Header` | ✅ Modify links |
| Hero Stats | `Card` + custom | ✅ Create StatCard variant |
| CTA Buttons | `Button` | ✅ Use existing variants |
| Service Cards | `Card` | ✅ Add icon + hover effects |
| Project Cards | `Card` | ✅ Add image + overlay |
| Testimonials | `Card` + `Avatar` | ✅ Combine components |
| Contact Form | `Input` + `Button` | ✅ Create ContactForm |
| Social Links | Custom | ✅ Use Phosphor icons |
| Section Headers | Custom | ✅ Typography component |
| Badges | `Badge` | ✅ Use existing |

---

## 🏗️ Technical Architecture

### File Structure

```
src/
├── app/
│   ├── portfolio/              # New portfolio route
│   │   ├── page.tsx           # Main portfolio page
│   │   └── layout.tsx         # Portfolio-specific layout (optional)
│   │
├── components/
│   ├── portfolio/             # Portfolio-specific components
│   │   ├── portfolio-hero.tsx         # Hero section with stats
│   │   ├── portfolio-stats.tsx        # Stats grid component
│   │   ├── services-section.tsx       # What I Do section
│   │   ├── service-card.tsx           # Individual service card
│   │   ├── projects-section.tsx       # Portfolio showcase
│   │   ├── project-card.tsx           # Project card with image
│   │   ├── testimonials-section.tsx   # Testimonials grid
│   │   ├── testimonial-card.tsx       # Single testimonial
│   │   ├── contact-section.tsx        # Contact CTA + form
│   │   ├── contact-form.tsx           # Contact form component
│   │   └── section-header.tsx         # Reusable section title
│   │
│   ├── ui/                    # Existing shadcn components (reuse)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── avatar.tsx
│   │   └── ...
│   │
│   ├── header.tsx             # Update for portfolio nav
│   └── footer.tsx             # Update for portfolio footer
│
├── lib/
│   ├── portfolio-data.ts      # Portfolio content data
│   └── utils.ts               # Existing utilities
│
└── public/
    └── portfolio/             # Portfolio assets
        ├── hero-image.png
        ├── projects/
        └── testimonials/
```

---

## 📦 Component Specifications

### 1. Portfolio Hero Section

**File:** `src/components/portfolio/portfolio-hero.tsx`

**Features:**
- Responsive grid layout (text left, image right)
- Animated gradient text for name/title
- Stats grid with icons (Phosphor: TrendUp, ChartLine, Globe)
- Dual CTAs with different variants
- Hero image with gradient background blob

**Props:**
```typescript
interface PortfolioHeroProps {
  name: string
  title: string
  description: string
  stats: Array<{ label: string; value: string; icon: React.ReactNode }>
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  heroImage: string
}
```

**Layout:**
```tsx
<section className="container mx-auto px-4 py-20">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    {/* Left: Text Content */}
    <div>
      <Badge>Tagline</Badge>
      <h1>Hey, I'm {name} — A {title}</h1>
      <p>{description}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(stat => <StatCard {...stat} />)}
      </div>

      {/* CTAs */}
      <div className="flex gap-4">
        <Button variant="default">{primaryCta.text}</Button>
        <Button variant="outline">{secondaryCta.text}</Button>
      </div>
    </div>

    {/* Right: Hero Image */}
    <div className="relative">
      {/* Gradient blob background */}
      <div className="absolute -z-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <img src={heroImage} alt="Hero" />
    </div>
  </div>
</section>
```

---

### 2. Stats Card Component

**File:** `src/components/portfolio/portfolio-stats.tsx`

**Features:**
- Minimal card design
- Icon + value + label
- Responsive sizing

**Props:**
```typescript
interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
}
```

**Implementation:**
```tsx
export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
```

---

### 3. Services Section

**File:** `src/components/portfolio/services-section.tsx`

**Features:**
- Section header with title + description
- Grid of service cards (2 cols mobile, 3-4 cols desktop)
- Contact CTA

**Layout:**
```tsx
<section className="container mx-auto px-4 py-20 bg-secondary/50">
  <SectionHeader
    title="WHAT I DO"
    description="I help startups..."
  />

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
    {services.map(service => <ServiceCard {...service} />)}
  </div>

  <div className="mt-8 text-center">
    <Button>Contact Me</Button>
  </div>
</section>
```

---

### 4. Service Card Component

**File:** `src/components/portfolio/service-card.tsx`

**Features:**
- Icon (Phosphor: Figma, DeviceMobile, Desktop, Sparkle)
- Title + subtitle
- Description
- Hover effect (scale + shadow)

**Props:**
```typescript
interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
}
```

**Implementation:**
```tsx
<Card className="transition-transform hover:scale-105 hover:shadow-lg">
  <CardHeader>
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{subtitle}</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">{description}</p>
  </CardContent>
</Card>
```

---

### 5. Projects Section

**File:** `src/components/portfolio/projects-section.tsx`

**Features:**
- Section header
- Grid of project cards (1-2-3 columns responsive)
- Filter tabs (optional: All, Web, Mobile, Design)

**Layout:**
```tsx
<section className="container mx-auto px-4 py-20">
  <SectionHeader title="PORTFOLIO" />

  {/* Optional filter tabs */}
  <Tabs defaultValue="all" className="mt-8">
    <TabsList>
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="web">Web</TabsTrigger>
      <TabsTrigger value="mobile">Mobile</TabsTrigger>
    </TabsList>

    <TabsContent value="all" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {projects.map(project => <ProjectCard {...project} />)}
    </TabsContent>
  </Tabs>
</section>
```

---

### 6. Project Card Component

**File:** `src/components/portfolio/project-card.tsx`

**Features:**
- Image with overlay on hover
- Badge for category
- Title + description
- CTA arrow icon
- Click to Dialog with full details

**Props:**
```typescript
interface ProjectCardProps {
  title: string
  description: string
  category: string
  image: string
  tags?: string[]
  link?: string
}
```

**Implementation:**
```tsx
<Card className="group overflow-hidden cursor-pointer">
  <div className="relative aspect-video overflow-hidden">
    <img
      src={image}
      alt={title}
      className="object-cover transition-transform group-hover:scale-110"
    />

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <Button variant="secondary">View Project <ArrowRight /></Button>
    </div>
  </div>

  <CardHeader>
    <Badge className="w-fit">{category}</Badge>
    <CardTitle className="flex items-center justify-between">
      {title}
      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
</Card>
```

---

### 7. Testimonials Section

**File:** `src/components/portfolio/testimonials-section.tsx`

**Features:**
- Section header
- Grid of testimonial cards (1-2-3 columns)
- Star ratings
- Avatar + name + role

**Layout:**
```tsx
<section className="container mx-auto px-4 py-20 bg-secondary/50">
  <SectionHeader title="TESTIMONIALS" />

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
    {testimonials.map(testimonial => <TestimonialCard {...testimonial} />)}
  </div>
</section>
```

---

### 8. Testimonial Card Component

**File:** `src/components/portfolio/testimonial-card.tsx`

**Features:**
- Quote text
- Star rating (using Phosphor Star icons)
- Avatar + name + role
- Company badge (optional)

**Props:**
```typescript
interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
  company?: string
}
```

**Implementation:**
```tsx
<Card>
  <CardHeader>
    <div className="flex gap-1 mb-2">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} weight="fill" className="text-yellow-500" />
      ))}
    </div>
    <CardDescription className="text-base">"{quote}"</CardDescription>
  </CardHeader>

  <CardFooter className="flex items-center gap-3">
    <Avatar>
      <AvatarImage src={avatar} />
      <AvatarFallback>{author[0]}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold text-sm">{author}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  </CardFooter>
</Card>
```

---

### 9. Contact Section

**File:** `src/components/portfolio/contact-section.tsx`

**Features:**
- Two-column layout (form left, info right)
- Contact form with validation
- Social media links
- Email/phone info
- Visual element (image or illustration)

**Layout:**
```tsx
<section className="container mx-auto px-4 py-20">
  <SectionHeader title="LET'S CONNECT" />

  <div className="grid lg:grid-cols-2 gap-12 mt-12">
    {/* Left: Contact Form */}
    <ContactForm />

    {/* Right: Contact Info + Image */}
    <div>
      <div className="mb-8">
        <h3>Get in touch</h3>
        <p>Email: contact@example.com</p>

        <div className="flex gap-4 mt-4">
          {socialLinks.map(link => (
            <Button variant="outline" size="icon" asChild>
              <a href={link.url}>{link.icon}</a>
            </Button>
          ))}
        </div>
      </div>

      <img src="/portfolio/contact-image.png" alt="Contact" className="rounded-lg" />
    </div>
  </div>
</section>
```

---

### 10. Contact Form Component

**File:** `src/components/portfolio/contact-form.tsx`

**Features:**
- Name, email, message fields
- Form validation (optional: react-hook-form + zod)
- Submit button with loading state
- Success/error alerts

**Implementation:**
```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="name" className="text-sm font-medium">Name</label>
    <Input id="name" placeholder="Your name" />
  </div>

  <div>
    <label htmlFor="email" className="text-sm font-medium">Email</label>
    <Input id="email" type="email" placeholder="your@email.com" />
  </div>

  <div>
    <label htmlFor="message" className="text-sm font-medium">Message</label>
    <textarea
      id="message"
      rows={5}
      className="w-full px-3 py-2 border rounded-md"
      placeholder="Your message..."
    />
  </div>

  <Button type="submit" className="w-full">
    Send Message <PaperPlaneTilt className="ml-2" />
  </Button>
</form>
```

---

### 11. Section Header Component

**File:** `src/components/portfolio/section-header.tsx`

**Features:**
- Reusable title + description
- Centered or left-aligned variants
- Underline decoration (optional)

**Props:**
```typescript
interface SectionHeaderProps {
  title: string
  description?: string
  align?: "left" | "center"
}
```

**Implementation:**
```tsx
export function SectionHeader({ title, description, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center")}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  )
}
```

---

## 📊 Data Structure

### Portfolio Data File

**File:** `src/lib/portfolio-data.ts`

```typescript
export const portfolioData = {
  hero: {
    name: "Your Name",
    title: "UI/UX Designer & Developer",
    tagline: "Crafting clean, user-focused experiences",
    description: "I design modern, user-first interfaces that turn ideas into smooth, functional, and beautiful digital products.",
    stats: [
      { label: "Years Experience", value: "2+", icon: TrendUp },
      { label: "Projects Completed", value: "15+", icon: CheckCircle },
      { label: "Web Apps Designed", value: "50+", icon: Globe }
    ],
    primaryCta: { text: "Get In Touch", href: "#contact" },
    secondaryCta: { text: "Explore Projects", href: "#portfolio" },
    heroImage: "/portfolio/hero-image.png"
  },

  services: [
    {
      icon: Figma,
      title: "UI/UX Design",
      subtitle: "Design With Purpose",
      description: "I craft modern, user-centered interfaces that prioritize usability, clarity, and visual balance — always designed with the end user in mind."
    },
    {
      icon: DeviceMobile,
      title: "Mobile App Design",
      subtitle: "iPhone, Clear, Visible",
      description: "By designing iOS and Android app interfaces with clear hierarchy, easy navigation, and soft visuals brings intuitive feel and intuitive on small screens."
    },
    {
      icon: Desktop,
      title: "Web App",
      subtitle: "Data-Rich, Yet Simple",
      description: "Designing modern, responsive websites that blend clarity, usability, and visual harmony — built to scale and crafted for real users."
    },
    {
      icon: Sparkle,
      title: "Effortless Experiences",
      subtitle: "Built Through Clarity",
      description: "Built Through Clarity, Intention, And Simplicity"
    }
  ],

  projects: [
    {
      title: "ECommerce Management Web App",
      description: "Project Overview: Dot/Krafts proudly produce premium kits...",
      category: "Web Design",
      image: "/portfolio/projects/project-1.png",
      tags: ["UI/UX", "Dashboard", "E-commerce"],
      link: "#"
    },
    // Add more projects...
  ],

  testimonials: [
    {
      quote: "Working with them was an absolute pleasure. The attention to detail and creativity exceeded our expectations.",
      author: "Sarah Johnson",
      role: "CEO",
      company: "TechCorp",
      avatar: "/portfolio/testimonials/avatar-1.png",
      rating: 5
    },
    // Add more testimonials...
  ],

  socialLinks: [
    { name: "LinkedIn", url: "https://linkedin.com", icon: LinkedinLogo },
    { name: "Twitter", url: "https://twitter.com", icon: TwitterLogo },
    { name: "GitHub", url: "https://github.com", icon: GithubLogo },
    { name: "Email", url: "mailto:contact@example.com", icon: Envelope }
  ]
}
```

---

## 🎨 Styling Guidelines

### Color Usage

```css
/* Primary Actions & Links */
.cta-button { background: oklch(0.715 0.143 215.221); }

/* Text Hierarchy */
.heading { color: oklch(0.141 0.005 285.823); }
.body-text { color: oklch(0.552 0.016); }

/* Backgrounds */
.section-bg { background: oklch(0.967 0.001 285.823); }
.card-bg { background: oklch(1 0 0); }

/* Accents */
.gradient-text {
  background: linear-gradient(135deg, oklch(0.715 0.143 215.221), oklch(0.8 0.1 280));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Typography Scale

```css
/* Headings */
.hero-title { @apply text-5xl md:text-6xl lg:text-7xl font-bold; }
.section-title { @apply text-3xl md:text-4xl font-bold; }
.card-title { @apply text-xl md:text-2xl font-semibold; }

/* Body */
.lead { @apply text-lg md:text-xl text-muted-foreground; }
.body { @apply text-base; }
.small { @apply text-sm text-muted-foreground; }
```

### Spacing System

```css
/* Sections */
.section-padding { @apply py-20 md:py-32; }

/* Containers */
.container { @apply mx-auto px-4 max-w-7xl; }

/* Grids */
.grid-cols-responsive { @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6; }
```

### Animation & Transitions

```css
/* Hover Effects */
.card-hover { @apply transition-all duration-300 hover:scale-105 hover:shadow-xl; }

/* Fade In */
.fade-in { @apply animate-in fade-in duration-700; }

/* Slide Up */
.slide-up { @apply animate-in slide-in-from-bottom-8 duration-500; }
```

---

## 🚀 Implementation Steps

### Phase 1: Setup & Structure (Estimated: 30 min)

1. ✅ **Create branch** (already on `claude/portfolio-landing-page-zeRlD`)
2. ✅ **Create folder structure**
   ```bash
   mkdir -p src/app/portfolio
   mkdir -p src/components/portfolio
   mkdir -p public/portfolio/{projects,testimonials}
   ```

3. ✅ **Create data file**
   - `src/lib/portfolio-data.ts` with sample data

4. ✅ **Create placeholder images**
   - Hero image
   - Project screenshots (3-6 placeholder images)
   - Testimonial avatars (3-4 placeholder images)

---

### Phase 2: Core Components (Estimated: 1-2 hours)

**Priority Order:**

5. ✅ **Section Header** (`section-header.tsx`)
   - Simple, reusable, foundation for other sections

6. ✅ **Portfolio Stats** (`portfolio-stats.tsx`)
   - Stat card component for hero section

7. ✅ **Portfolio Hero** (`portfolio-hero.tsx`)
   - Main hero section with stats integration
   - Test responsive layout

8. ✅ **Service Card** (`service-card.tsx`)
   - Individual service card with icon + hover

9. ✅ **Services Section** (`services-section.tsx`)
   - Grid of service cards

---

### Phase 3: Portfolio & Testimonials (Estimated: 1 hour)

10. ✅ **Project Card** (`project-card.tsx`)
    - Image card with hover overlay
    - Badge integration

11. ✅ **Projects Section** (`projects-section.tsx`)
    - Grid layout with optional tabs

12. ✅ **Testimonial Card** (`testimonial-card.tsx`)
    - Quote + avatar + rating

13. ✅ **Testimonials Section** (`testimonials-section.tsx`)
    - Grid of testimonials

---

### Phase 4: Contact & Navigation (Estimated: 1 hour)

14. ✅ **Contact Form** (`contact-form.tsx`)
    - Form fields + validation
    - Submit handler (console.log for now)

15. ✅ **Contact Section** (`contact-section.tsx`)
    - Two-column layout
    - Social links integration

16. ✅ **Update Header** (`src/components/header.tsx`)
    - Add portfolio navigation link
    - Ensure mobile menu works

---

### Phase 5: Page Assembly (Estimated: 30 min)

17. ✅ **Create Portfolio Page** (`src/app/portfolio/page.tsx`)
    - Import all sections
    - Assemble in order:
      1. Hero
      2. Services
      3. Projects
      4. Testimonials
      5. Contact

18. ✅ **Add metadata**
    - SEO title, description
    - Open Graph tags

---

### Phase 6: Polish & Refinement (Estimated: 1 hour)

19. ✅ **Responsive testing**
    - Mobile (320px - 640px)
    - Tablet (640px - 1024px)
    - Desktop (1024px+)

20. ✅ **Dark mode testing**
    - Verify all sections work in dark mode
    - Adjust colors if needed

21. ✅ **Animation polish**
    - Add scroll animations (optional: framer-motion)
    - Stagger animations for grids

22. ✅ **Accessibility audit**
    - ARIA labels
    - Keyboard navigation
    - Focus states
    - Color contrast

23. ✅ **Performance check**
    - Image optimization
    - Lazy loading
    - Bundle size

---

### Phase 7: Final Review & Deploy (Estimated: 30 min)

24. ✅ **Code review**
    - Clean up console.logs
    - Remove unused imports
    - Format code

25. ✅ **Add README section**
    - Document portfolio page
    - Add screenshots

26. ✅ **Git commit & push**
    ```bash
    git add .
    git commit -m "feat: add portfolio landing page with hero, services, projects, testimonials, and contact sections"
    git push -u origin claude/portfolio-landing-page-zeRlD
    ```

27. ✅ **Create pull request**
    - Descriptive title and summary
    - Screenshots of sections
    - Test checklist

---

## 📸 Expected Sections (In Order)

1. **Hero Section** (Full viewport height)
   - Name + title with gradient text
   - Description
   - Stats grid (3 columns)
   - Dual CTAs
   - Hero image

2. **Services Section** (Light background)
   - Section title
   - Description
   - 4 service cards in grid
   - Contact CTA

3. **Portfolio Section** (White background)
   - Section title
   - Project grid (3 columns)
   - 6-9 project cards

4. **Testimonials Section** (Light background)
   - Section title
   - Testimonial grid (3 columns)
   - 3-6 testimonial cards

5. **Contact Section** (White background)
   - Section title
   - Two-column layout (form + info)
   - Social links
   - Contact image

6. **Footer** (Existing footer component)

---

## 🎯 Success Criteria

### Functionality
- ✅ All sections render correctly
- ✅ Responsive on all screen sizes
- ✅ Dark mode works properly
- ✅ Navigation links work
- ✅ Contact form accepts input (validation optional)
- ✅ All buttons and links have hover states

### Design
- ✅ Matches design inspiration aesthetically
- ✅ Uses existing color theme consistently
- ✅ Typography hierarchy is clear
- ✅ Spacing is consistent (8px grid)
- ✅ Images display properly
- ✅ Hover effects are smooth

### Code Quality
- ✅ TypeScript types are correct
- ✅ Components are reusable
- ✅ No console errors
- ✅ Accessibility best practices followed
- ✅ Code is documented with comments
- ✅ Follows existing code patterns

### Performance
- ✅ Page loads quickly (<2s)
- ✅ Images are optimized
- ✅ No layout shift (CLS)
- ✅ Smooth animations (60fps)

---

## 🔧 Technical Considerations

### Responsive Breakpoints
```typescript
// Tailwind breakpoints (default)
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

### Image Optimization
- Use Next.js `<Image>` component for automatic optimization
- Provide width/height to prevent layout shift
- Use `priority` prop for hero image
- Lazy load below-the-fold images

### SEO Optimization
```tsx
export const metadata = {
  title: "Portfolio | Your Name - UI/UX Designer & Developer",
  description: "Explore my portfolio of modern, user-focused web and mobile applications.",
  openGraph: {
    title: "Portfolio | Your Name",
    description: "UI/UX Designer & Developer",
    images: ["/portfolio/og-image.png"]
  }
}
```

### Accessibility Checklist
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Semantic HTML elements used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works

---

## 🎨 Design Tokens Reference

### Colors (OKLCH)
```typescript
const colors = {
  primary: "oklch(0.715 0.143 215.221)",      // Blue
  secondary: "oklch(0.967 0.001 285.823)",    // Light Gray
  foreground: "oklch(0.141 0.005 285.823)",   // Dark Gray
  muted: "oklch(0.552 0.016)",                // Medium Gray
  background: "oklch(1 0 0)",                 // White
  border: "oklch(0.92 0.004 285.823)",        // Light Border
}
```

### Typography
```typescript
const typography = {
  fontFamily: {
    sans: "DM Sans",
    mono: "Geist Mono"
  },
  fontSize: {
    hero: "4.5rem",    // 72px
    h1: "3rem",        // 48px
    h2: "2.25rem",     // 36px
    h3: "1.5rem",      // 24px
    body: "1rem",      // 16px
    small: "0.875rem"  // 14px
  }
}
```

### Spacing (8px Grid)
```typescript
const spacing = {
  section: "5rem",   // 80px
  container: "1rem", // 16px
  card: "1.5rem",    // 24px
  element: "0.5rem"  // 8px
}
```

---

## 📝 Notes & Best Practices

### Component Organization
- Keep components small and focused (single responsibility)
- Extract reusable logic into custom hooks
- Use TypeScript for prop types and interfaces
- Document complex logic with comments

### Styling Approach
- Use Tailwind utility classes for styling
- Leverage existing CSS variables from globals.css
- Avoid inline styles (use className)
- Use `cn()` utility for conditional classes

### Data Management
- Keep portfolio data in `portfolio-data.ts`
- Use TypeScript interfaces for type safety
- Make data easily editable for future updates
- Consider CMS integration for production

### Git Workflow
- Commit frequently with clear messages
- Use conventional commit format: `feat:`, `fix:`, `docs:`, `style:`
- Push to designated branch only
- Create detailed PR with screenshots

---

## 🚦 Quality Assurance Checklist

Before pushing:

### Visual
- [ ] Desktop layout looks correct (1920px)
- [ ] Tablet layout looks correct (768px)
- [ ] Mobile layout looks correct (375px)
- [ ] Dark mode colors are correct
- [ ] Images load and display properly
- [ ] Fonts render correctly

### Functional
- [ ] Navigation links work
- [ ] CTAs have correct href values
- [ ] Contact form accepts input
- [ ] Hover effects work on all interactive elements
- [ ] Mobile menu opens/closes
- [ ] Theme toggle works

### Technical
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] No warnings in build
- [ ] All imports are used
- [ ] Code is formatted (Prettier)
- [ ] No hardcoded values (use data file)

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shift
- [ ] Images are optimized

---

## 🎉 Deliverables

1. **Portfolio Landing Page** (`/portfolio` route)
   - Fully responsive
   - Dark mode compatible
   - Accessible
   - Performance optimized

2. **Reusable Components** (9 new components)
   - Portfolio Hero
   - Services Section
   - Projects Section
   - Testimonials Section
   - Contact Section
   - + Individual card components

3. **Portfolio Data Structure**
   - Type-safe data file
   - Easy to update
   - Scalable for more projects

4. **Documentation**
   - This implementation plan
   - Code comments
   - README update
   - PR description

---

## 📚 Resources & References

### Existing Components
- `src/components/ui/` - 23 shadcn components
- `src/components/header.tsx` - Navigation reference
- `src/components/footer.tsx` - Footer reference
- `src/app/globals.css` - Theme variables

### External Resources
- [Phosphor Icons](https://phosphoricons.com/) - Icon library
- [shadcn/ui](https://ui.shadcn.com/) - Component documentation
- [Tailwind CSS](https://tailwindcss.com/) - Utility classes
- [Next.js 16](https://nextjs.org/) - Framework docs

### Design Inspiration
- Provided Milton portfolio design (reference image)
- Existing codebase design patterns
- Modern portfolio best practices

---

## 🎯 Next Steps After Implementation

### Enhancements (Post-MVP)
1. **Animation Library**
   - Add Framer Motion for scroll animations
   - Stagger effects for grids
   - Page transitions

2. **CMS Integration**
   - Connect to Sanity/Contentful
   - Make portfolio data editable
   - Add blog functionality

3. **Advanced Features**
   - Project detail pages (dynamic routes)
   - Case study sections
   - Email integration for contact form
   - Analytics tracking

4. **SEO & Performance**
   - Add structured data (JSON-LD)
   - Optimize images further (WebP, AVIF)
   - Add sitemap
   - Implement caching

---

## ✅ Ready to Build!

This plan provides a complete roadmap for building a modern, professional portfolio landing page that:
- ✅ Follows the design inspiration
- ✅ Uses existing codebase theme and components
- ✅ Is fully responsive and accessible
- ✅ Follows Next.js and React best practices
- ✅ Is maintainable and scalable

**Estimated Total Time:** 4-6 hours for complete implementation

**Branch:** `claude/portfolio-landing-page-zeRlD`

**Ready to start coding!** 🚀
