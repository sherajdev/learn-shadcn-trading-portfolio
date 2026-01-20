# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trading portfolio tracking web application built with Next.js 15, React 19, and TypeScript.

## Commands

```bash
pnpm dev              # Start development server (0.0.0.0:3333)
pnpm build            # Build for production
pnpm lint             # Run Next.js linting
```

## Architecture

### Stack
- **Frontend**: Next.js 15 App Router, React 19, TypeScript (strict mode)
- **Styling**: Tailwind CSS with dark mode (class-based toggle), CSS variables for theming

### Node 22+ Compatibility
The dev script includes `NODE_OPTIONS='--localstorage-file=/tmp/node-localstorage'` to fix a localStorage SSR issue with Node 22+. Next.js's DevOverlay calls localStorage during SSR, which fails without this flag.

### Directory Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── dashboard/    # Portfolio metrics view
│   ├── portfolios/   # Portfolio management
│   └── settings/     # User preferences
├── components/       # React components (Sidebar)
└── lib/utils.ts      # Utility functions (cn for class merging)
components/ui/        # Shared UI components (root level)
```

### Key Patterns
- **Path alias**: `@/*` maps to `./src/*`
- **Client components**: Mark with `"use client"` for interactivity
- **Class merging**: Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- **Layout**: Root layout includes Sidebar; main content at 64rem left margin on desktop
