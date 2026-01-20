# Dashboard Page Implementation Plan

## Overview
Create a new dashboard page showcasing the project's Cyan/Zinc theme with shadcn/ui components, referencing the shadcn dashboard example.

## Progress Tracker

- [x] Phase 1: Install Required Components
- [x] Phase 2: Create mock data file
- [x] Phase 3: Create dashboard layout with sidebar
- [x] Phase 4: Create dashboard header
- [x] Phase 5: Create stat card component and grid
- [x] Phase 6: Create visitors chart
- [x] Phase 7: Create data table with columns
- [x] Phase 8: Assemble dashboard page
- [x] Phase 9: Update header navigation
- [x] Phase 10: Test responsive behavior

## Phase 1: Install Required Components

```bash
npx shadcn@latest add table select dropdown-menu separator input checkbox chart sidebar scroll-area skeleton collapsible
```

## Phase 2: File Structure

```
src/
├── app/dashboard/
│   ├── layout.tsx              # Dashboard layout with sidebar
│   └── page.tsx                # Main dashboard content
├── components/dashboard/
│   ├── dashboard-sidebar.tsx   # Collapsible sidebar navigation
│   ├── dashboard-header.tsx    # Sticky header with title + actions
│   ├── stat-card.tsx           # Reusable metric card component
│   ├── stat-cards-grid.tsx     # Grid of 4 stat cards
│   ├── visitors-chart.tsx      # Area chart for visitors
│   ├── data-table.tsx          # Data table with pagination
│   └── data-table-columns.tsx  # Column definitions
└── lib/
    └── dashboard-data.ts       # Mock data for dashboard
```

## Phase 3: Implementation Steps

### Step 1: Install shadcn/ui components
- table, select, dropdown-menu, separator, input, checkbox
- chart (includes recharts), sidebar, scroll-area, skeleton, collapsible

### Step 2: Create mock data (`src/lib/dashboard-data.ts`)
- Stats: Total Revenue ($1,250, +12.5%), New Customers (1,234, +8.2%), Active Accounts (45,678, +4.1%), Growth Rate (4.5%, -2.3%)
- Visitor chart data (12 months)
- Customer table data (10 rows with id, name, email, status, amount, date)
- Sidebar navigation structure

### Step 3: Create dashboard layout (`src/app/dashboard/layout.tsx`)
- Use SidebarProvider and SidebarInset from shadcn/ui
- Wrap children with DashboardSidebar

### Step 4: Create dashboard sidebar (`src/components/dashboard/dashboard-sidebar.tsx`)
- Branding: Cube icon + "Dashboard" text
- Main nav: Home, Dashboard, Analytics (Phosphor icons)
- Collapsible sections: Projects, Team
- Settings link
- User profile at bottom with avatar and sign out

### Step 5: Create dashboard header (`src/components/dashboard/dashboard-header.tsx`)
- SidebarTrigger (hamburger menu)
- Separator
- Page title
- "Quick Create" button with Plus icon

### Step 6: Create stat card (`src/components/dashboard/stat-card.tsx`)
- Card with title, large value, trend indicator
- TrendUp (green) / TrendDown (red) icons from Phosphor
- Change percentage and label

### Step 7: Create stat cards grid (`src/components/dashboard/stat-cards-grid.tsx`)
- 4 cards: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

### Step 8: Create visitors chart (`src/components/dashboard/visitors-chart.tsx`)
- Card wrapper with title "Total Visitors"
- Date range selector (Select component)
- Area chart with cyan gradient fill
- Use ChartContainer, ChartTooltip from shadcn/ui chart

### Step 9: Create data table columns (`src/components/dashboard/data-table-columns.tsx`)
- Checkbox (row selection)
- Name (sortable)
- Email
- Status (Badge: active/inactive/pending)
- Amount (currency formatted)
- Date
- Actions (DropdownMenu)

### Step 10: Create data table (`src/components/dashboard/data-table.tsx`)
- Filter input for searching
- Sortable columns with @tanstack/react-table
- Pagination controls

### Step 11: Assemble dashboard page (`src/app/dashboard/page.tsx`)
- DashboardHeader
- StatCardsGrid
- VisitorsChart (lg:col-span-4)
- DataTable in Card wrapper

### Step 12: Update header navigation (`src/components/header.tsx`)
- Add "Dashboard" link after "Components"
- Link to /dashboard

## Phase 4: Theme Consistency

- Use existing Cyan primary (`--primary`)
- Sharp corners (0rem radius already configured)
- Phosphor Icons from `@phosphor-icons/react/dist/ssr`
- DM Sans font
- Dark/light mode support

## Decisions

- **Sidebar**: Visual only - links present but only /dashboard is functional
- **Table**: Basic features - sorting, filtering, pagination (no drag-reorder)

## Key Files to Modify

- `src/components/header.tsx` - Add Dashboard nav link
- `src/app/globals.css` - Already has chart colors configured

## Responsive Design

- Mobile: Sidebar hidden, trigger via hamburger
- Tablet: Sidebar collapsed (icons only)
- Desktop: Sidebar expanded
