# Trading Portfolio

A trading portfolio tracking application built with Next.js 15, Convex backend, Better Auth authentication, and Cloudflare Workers deployment.

## Features

- 🔐 **Authentication** - Secure user accounts with Better Auth + Convex
- 📊 **Dashboard** - View portfolio value, P&L, and holdings at a glance
- 💼 **Portfolios** - Create and manage multiple portfolios
- 🔄 **Real-time Updates** - Convex handles data synchronization
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works on desktop and mobile
- ☁️ **Cloudflare Workers** - Deployed with @opennextjs/cloudflare

## Tech Stack

- **Frontend**: Next.js 15.3, TypeScript, App Router
- **UI**: shadcn/ui, Tailwind CSS, Zinc theme
- **Backend**: Convex (serverless database & functions)
- **Authentication**: Better Auth with Convex integration
- **Deployment**: Cloudflare Workers via @opennextjs/cloudflare
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Convex account (for production deployment)

### Installation

```bash
cd trading-portfolio
pnpm install
```

### Development

1. Start the Convex dev server (includes Better Auth):
```bash
npx convex dev
```

2. In a separate terminal, start the Next.js dev server:
```bash
pnpm dev
```

3. Open http://localhost:3000 and sign up for an account

The database will be automatically seeded with sample holdings on first login.

### Authentication

The app includes a complete authentication system:

- **Sign Up**: Create a new account at /signup
- **Sign In**: Sign in at /login
- **Sign Out**: Sign out from the dashboard
- **Protected Routes**: Dashboard requires authentication (redirects to login)

### Convex Commands

```bash
# Start Convex dev server (includes auth API)
npx convex dev

# Deploy Convex to production
npx convex deploy
```

### Deployment to Cloudflare

```bash
# Build for Cloudflare Pages
pnpm pages:build

# Deploy to Cloudflare Pages
pnpm pages:dev  # For preview
# Or use Wrangler for production deployment
```

## Project Structure

```
trading-portfolio/
├── convex/
│   ├── functions.ts    # Convex queries, mutations, and auth
│   └── schema.ts       # Database schema + Better Auth tables
├── src/
│   ├── app/
│   │   ├── (auth)/         # Auth pages (login, signup)
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── api/
│   │   │   └── auth/       # Better Auth API endpoint
│   │   │       └── [betterauth]/
│   │   ├── dashboard/  # Protected dashboard page
│   │   ├── portfolios/ # Portfolios management
│   │   ├── settings/   # Settings page
│   │   ├── layout.tsx  # Root layout with sidebar
│   │   └── globals.css # Global styles + Tailwind
│   ├── components/
│   │   ├── sidebar.tsx         # Navigation sidebar
│   │   ├── theme-provider.tsx  # Dark mode provider
│   │   ├── theme-toggle.tsx    # Theme switcher
│   │   ├── convex-provider.tsx # Convex + Better Auth provider
│   │   └── better-auth-provider.tsx  # Better Auth client
│   └── lib/
│       ├── convex.ts    # Convex client
│       └── utils.ts     # Utility functions
├── src/middleware.ts    # Auth middleware for route protection
├── wrangler.toml       # Cloudflare Workers config
└── tailwind.config.*   # Tailwind configuration
```

## Database Schema

### Better Auth Tables (auto-managed)
- users - User accounts
- sessions - Active sessions
- accounts - Linked accounts
- verification - Email verification

### Application Tables
- portfolios: id, userId, name, createdAt
- holdings: id, portfolioId, symbol, name, type, quantity, avgBuyPrice, currentPrice, change24h, createdAt
- transactions: id, holdingId, type, quantity, price, date

All queries and mutations are protected and filter data by the authenticated user's ID.

## Environment Variables

Create a .env.local file:

```env
NEXT_PUBLIC_CONVEX_URL=your-convex-url
CONVEX_SITE_URL=http://localhost:3000
```

For Cloudflare deployment, additional environment variables may be required.

## Security

- All API routes are protected with session-based authentication
- Users can only access their own portfolios and holdings
- Middleware prevents unauthenticated access to protected routes
- Password-based signup with secure session management

## License

MIT
