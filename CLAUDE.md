# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16.1.1** with App Router
- **React 19.2.3**
- **TypeScript** (target ES2017, path alias `@/*` maps to `./src/*`)
- **Tailwind CSS 4** with PostCSS
- **shadcn/ui** (New York style, zinc base color)
- **Recharts** for data visualization
- **TanStack Table** for sortable/filterable tables
- **Phosphor Icons** (duotone weight) and Lucide Icons
- **next-themes** for dark/light mode

## Architecture

### Route Structure
- `/` - Landing page (`src/app/page.tsx`)
- `/dashboard` - Main trading dashboard with sidebar layout
- `/portfolio` - Portfolio landing page

### Component Organization
- `src/components/ui/` - shadcn/ui primitives (Button, Card, Table, etc.)
- `src/components/dashboard/` - Trading dashboard components (PortfolioOverview, HoldingsTable, charts)
- `src/components/portfolio/` - Portfolio page sections
- `src/components/showcase/` - Component demos

### Data Layer
All trading data is mock data in `src/lib/trading-data.ts`:
- `holdings` - Array of 18 holdings across 5 asset types (stock, etf, crypto, metal, forex)
- `portfolioOverview` - Computed portfolio metrics
- `assetAllocation` - Asset breakdown with colors
- `performanceData` - 12 months of historical values
- Helper functions: `formatCurrency()`, `formatPercent()`, `getHoldingsByType()`

### Layout Hierarchy
```
RootLayout (ThemeProvider)
  └── DashboardLayout (SidebarProvider + DashboardSidebar)
        └── Page content
```

## Key Patterns

### Class Merging
Use the `cn()` utility from `lib/utils.ts` for conditional Tailwind classes:
```typescript
className={cn("base-classes", condition && "conditional-classes", className)}
```

### Component Variants (CVA)
shadcn/ui components use class-variance-authority for variants (see `button.tsx` for example).

### Client Components
Add `'use client'` directive for components using hooks or interactivity.

### Adding shadcn/ui Components
```bash
npx shadcn@latest add <component-name>
```

## Theming

CSS variables in `globals.css` use OKLch color space. Key custom colors:
- Gold accent: `--gold` (primary in dark mode)
- Chart colors: `--chart-1` through `--chart-5`
- Status colors: `--success`, `--warning`, `--error`

## Asset Type System

Asset types used throughout: `'stock' | 'etf' | 'crypto' | 'metal' | 'forex'`

Each has an assigned color in `assetColors` mapping for consistent chart/badge styling.
