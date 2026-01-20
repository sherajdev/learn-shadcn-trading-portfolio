# NextJS + shadcn/ui Component Showcase Landing Page

## Project Overview

A learning project to get familiar with vibe coding NextJS and shadcn/ui. This landing page showcases 10 different shadcn/ui components with simple explanations for each.

## Theme Configuration

Use the shadcn/ui `create` feature with these exact settings:

| Setting | Value |
|---------|-------|
| Style | Maia |
| Base Color | Zinc |
| Theme | Cyan |
| Icon Library | Phosphor |
| Font | DM Sans |
| Radius | None (0rem - sharp corners) |
| Menu Accent | Bold |
| Menu Color | Inverted |

**Reference URL:** https://ui.shadcn.com/create?base=base&style=maia&baseColor=zinc&theme=cyan&iconLibrary=phosphor&font=dm-sans&menuAccent=bold&menuColor=inverted&radius=none

---

## Phase 1: Project Setup

### Step 1.1: Create NextJS Project

```bash
npx create-next-app@latest shadcn-showcase --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd shadcn-showcase
```

### Step 1.2: Initialize shadcn/ui

```bash
npx shadcn@latest init
```

When prompted, select:
- Style: Maia
- Base color: Zinc
- CSS variables: Yes

### Step 1.3: Configure Theme

Update `tailwind.config.ts` and `globals.css` to use:
- **Cyan** as the primary/accent color
- **DM Sans** as the font family
- **0rem** radius for all components (sharp corners)

Add DM Sans font via `next/font/google`:

```typescript
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans'
})
```

### Step 1.4: Install Phosphor Icons

```bash
npm install @phosphor-icons/react
```

### Step 1.5: Install Required shadcn/ui Components

```bash
npx shadcn@latest add button card badge alert tabs accordion avatar progress switch tooltip dialog
```

---

## Phase 2: Page Structure

### Landing Page Layout (`src/app/page.tsx`)

```
┌─────────────────────────────────────────────────────┐
│                     HEADER                          │
│  Logo + Nav + Theme Toggle                          │
├─────────────────────────────────────────────────────┤
│                   HERO SECTION                      │
│  Title + Subtitle + CTA Buttons                     │
├─────────────────────────────────────────────────────┤
│              COMPONENT SHOWCASE GRID                │
│  10 Components in organized sections                │
├─────────────────────────────────────────────────────┤
│                     FOOTER                          │
│  Links + Credits                                    │
└─────────────────────────────────────────────────────┘
```

---

## Phase 3: Components to Showcase

Each component section should include:
1. **Component name** as a heading
2. **Brief explanation** (1-2 sentences about what it does)
3. **Live interactive example** of the component
4. **Use case hint** (when to use this component)

### Component List (10 Components)

#### 1. Button
**Explanation:** The most fundamental interactive element. Triggers actions when clicked.
**Demo:** Show all variants (default, secondary, outline, ghost, destructive) and sizes.
**Use case:** Form submissions, navigation, triggering modals.

#### 2. Card
**Explanation:** A container that groups related content and actions together.
**Demo:** Card with header, content, image, and footer with actions.
**Use case:** Product displays, user profiles, content previews.

#### 3. Badge
**Explanation:** Small status descriptors for UI elements.
**Demo:** Show variants (default, secondary, outline, destructive) with icons.
**Use case:** Status indicators, counts, labels, tags.

#### 4. Alert
**Explanation:** Displays important messages that require user attention.
**Demo:** Show different alert types (info, warning, success, destructive).
**Use case:** Form validation, system notifications, warnings.

#### 5. Tabs
**Explanation:** Organizes content into separate views within the same context.
**Demo:** 3-tab example with different content in each.
**Use case:** Settings pages, dashboards, content organization.

#### 6. Accordion
**Explanation:** Vertically stacked list of expandable/collapsible content sections.
**Demo:** FAQ-style accordion with 3-4 items.
**Use case:** FAQs, documentation, progressive disclosure.

#### 7. Avatar
**Explanation:** Represents a user or entity with an image or fallback initials.
**Demo:** Show with image, fallback, and grouped avatars.
**Use case:** User profiles, comments, team member lists.

#### 8. Progress
**Explanation:** Displays completion status of a task or process.
**Demo:** Animated progress bar with percentage label.
**Use case:** File uploads, onboarding flows, loading states.

#### 9. Switch
**Explanation:** Toggle control for binary on/off states.
**Demo:** Interactive switch with label showing current state.
**Use case:** Settings toggles, feature flags, preferences.

#### 10. Dialog (Modal)
**Explanation:** Overlay window that requires user interaction before returning to main content.
**Demo:** Button that opens a dialog with form content.
**Use case:** Confirmations, forms, detailed views.

---

## Phase 4: Implementation Details

### File Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with font & theme
│   ├── page.tsx          # Main landing page
│   └── globals.css       # Theme CSS variables
├── components/
│   ├── ui/               # shadcn components (auto-generated)
│   ├── header.tsx        # Site header with nav
│   ├── hero.tsx          # Hero section
│   ├── component-card.tsx # Wrapper for each component demo
│   ├── showcase/         # Individual component demos
│   │   ├── button-demo.tsx
│   │   ├── card-demo.tsx
│   │   ├── badge-demo.tsx
│   │   ├── alert-demo.tsx
│   │   ├── tabs-demo.tsx
│   │   ├── accordion-demo.tsx
│   │   ├── avatar-demo.tsx
│   │   ├── progress-demo.tsx
│   │   ├── switch-demo.tsx
│   │   └── dialog-demo.tsx
│   └── footer.tsx        # Site footer
└── lib/
    └── utils.ts          # Utility functions (cn helper)
```

### Component Card Wrapper

Create a reusable wrapper for each component showcase:

```tsx
// components/component-card.tsx
interface ComponentCardProps {
  name: string
  description: string
  useCase: string
  children: React.ReactNode
}

export function ComponentCard({ name, description, useCase, children }: ComponentCardProps) {
  return (
    <div className="border border-border p-6 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      
      <div className="py-6 flex items-center justify-center bg-muted/30">
        {children}
      </div>
      
      <p className="text-sm text-muted-foreground">
        <span className="font-medium">When to use:</span> {useCase}
      </p>
    </div>
  )
}
```

### Hero Section Content

```tsx
// Suggested hero content
<h1>Explore shadcn/ui Components</h1>
<p>A hands-on showcase of beautifully designed, accessible components 
   built with Radix UI and Tailwind CSS.</p>
<div className="flex gap-4">
  <Button>Get Started</Button>
  <Button variant="outline">View Docs</Button>
</div>
```

---

## Phase 5: Styling Guidelines

### Theme Colors (Cyan on Zinc)

The cyan accent should be used for:
- Primary buttons
- Active states
- Links and interactive elements
- Focus rings

The zinc base provides:
- Background colors
- Border colors
- Text hierarchy (zinc-900 for headings, zinc-600 for body, zinc-400 for muted)

### Typography Scale

Using DM Sans throughout:
- Hero title: `text-4xl md:text-6xl font-bold`
- Section titles: `text-2xl font-semibold`
- Component names: `text-xl font-semibold`
- Body text: `text-base`
- Muted/helper text: `text-sm text-muted-foreground`

### Spacing

With no border radius, use generous spacing to maintain visual hierarchy:
- Section padding: `py-16 md:py-24`
- Component grid gap: `gap-6 md:gap-8`
- Card internal padding: `p-6`

### Sharp Corners Aesthetic

Since radius is set to none:
- All components will have sharp 90° corners
- This creates a modern, editorial, geometric feel
- Emphasize clean lines and structured layouts

---

## Phase 6: Interactive Features

### Theme Toggle
Add a dark/light mode toggle in the header using `next-themes`:

```bash
npm install next-themes
```

### Component Interactivity
Each demo should be fully interactive:
- Buttons should have hover/active states
- Switches should toggle
- Accordions should expand/collapse
- Dialog should open/close
- Progress should animate on page load

---

## Phase 7: Testing Checklist

- [ ] All 10 components render correctly
- [ ] Theme colors (cyan/zinc) applied properly
- [ ] DM Sans font loads and displays
- [ ] No border radius on any components
- [ ] Phosphor icons display correctly
- [ ] Dark/light mode toggle works
- [ ] All interactive states functional
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible (keyboard navigation, ARIA labels)

---

## Quick Start Commands

```bash
# Create and setup project
npx create-next-app@latest shadcn-showcase --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd shadcn-showcase

# Initialize shadcn with your theme
npx shadcn@latest init

# Install all required components
npx shadcn@latest add button card badge alert tabs accordion avatar progress switch tooltip dialog

# Install additional dependencies
npm install @phosphor-icons/react next-themes

# Start development server
npm run dev
```

---

## Notes for Claude Code

1. **Reference the shadcn/ui docs** at https://ui.shadcn.com/docs for component APIs
2. **Use Phosphor icons** instead of Lucide (the default) - import from `@phosphor-icons/react`
3. **Keep explanations simple** - this is a learning project, not production documentation
4. **Make it visually appealing** - use the cyan accent color thoughtfully to highlight important elements
5. **Ensure accessibility** - all interactive components should be keyboard navigable

---

## Example Component Demo Implementation

```tsx
// components/showcase/button-demo.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "@phosphor-icons/react"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button>
        <Heart className="mr-2 h-4 w-4" />
        With Icon
      </Button>
      <Button>
        Next Step
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
```

---

