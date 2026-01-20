# Implementation Plan: Better Auth + Convex Integration

This document outlines the detailed implementation plan for adding **Better Auth** and **Convex** to the trading portfolio dashboard.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Prerequisites](#2-prerequisites)
3. [Phase 1: Convex Setup](#3-phase-1-convex-setup)
4. [Phase 2: Better Auth Integration](#4-phase-2-better-auth-integration)
5. [Phase 3: Database Schema Design](#5-phase-3-database-schema-design)
6. [Phase 4: Auth UI Components](#6-phase-4-auth-ui-components)
7. [Phase 5: Data Migration](#7-phase-5-data-migration)
8. [Phase 6: Protected Routes & User Scoping](#8-phase-6-protected-routes--user-scoping)
9. [Phase 7: Dashboard Updates](#9-phase-7-dashboard-updates)
10. [Testing & Validation](#10-testing--validation)
11. [File Changes Summary](#11-file-changes-summary)

---

## 1. Overview

### Current State
- Static mock data in `src/lib/trading-data.ts`
- No authentication (hard-coded "John Doe" user)
- No database backend
- All data is global (not user-scoped)

### Target State
- **Convex** as the real-time database backend
- **Better Auth** for authentication (email/password + optional OAuth)
- **Better Auth UI** for pre-built shadcn/ui auth components
- User-scoped portfolio data
- Real-time updates across devices

### Why This Stack?
- **Convex Better Auth Component**: Official integration that handles JWT tokens, session management, and database adapter automatically
- **Better Auth UI**: Pre-built shadcn/ui styled components that match the existing design system
- **Real-time by default**: Convex subscriptions provide live updates without additional setup

---

## 2. Prerequisites

### Required Accounts
- [ ] Convex account (free tier available): https://convex.dev
- [ ] (Optional) OAuth provider credentials (GitHub, Google)

### Dependencies to Install

```bash
# Core Convex packages
npm install convex@latest

# Better Auth + Convex integration
npm install @convex-dev/better-auth
npm install better-auth@1.4.9 --save-exact

# Better Auth UI (shadcn/ui styled components)
npm install @daveyplate/better-auth-ui

# Dev dependencies
npm install @types/node --save-dev
```

---

## 3. Phase 1: Convex Setup

### 3.1 Initialize Convex

```bash
# Login to Convex (first time)
npx convex login

# Initialize Convex in the project
npx convex init
```

This creates:
- `convex/` directory for backend functions
- `convex.json` configuration file

### 3.2 Configure Environment Variables

Create `.env.local`:

```bash
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_SITE_URL=https://your-site.convex.site

# For local development
# NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:3210
# CONVEX_SITE_URL=http://127.0.0.1:3211

# Site URL (for auth redirects)
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Set Convex environment variables:

```bash
# Generate and set Better Auth secret
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)

# Set site URL
npx convex env set SITE_URL http://localhost:3000
```

### 3.3 Update `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Convex directory in ESLint
  eslint: {
    dirs: ["src", "convex"],
  },
};

export default nextConfig;
```

---

## 4. Phase 2: Better Auth Integration

### 4.1 Install Better Auth Component

```bash
npx @convex-dev/better-auth
```

This creates:
- `convex/betterAuth/` - Component files
- Updates `convex/convex.config.ts`

### 4.2 Create Auth Configuration

**File: `convex/auth.config.ts`**

```typescript
import { getAuthConfigProvider } from "@convex-dev/better-auth/auth-config";
import type { AuthConfig } from "convex/server";

export default {
  providers: [getAuthConfigProvider()],
} satisfies AuthConfig;
```

### 4.3 Create Server Auth Instance

**File: `convex/auth.ts`**

```typescript
import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth, type BetterAuthOptions } from "better-auth/minimal";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL!;

// Auth component client
export const authComponent = createClient<DataModel>(components.betterAuth);

// Create Better Auth instance
export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false, // Set to true in production
    },
    // Optional: Add social providers
    // socialProviders: {
    //   github: {
    //     clientId: process.env.GITHUB_CLIENT_ID!,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    //   },
    //   google: {
    //     clientId: process.env.GOOGLE_CLIENT_ID!,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   },
    // },
    plugins: [
      convex({ authConfig }),
    ],
  });
};

// Query to get current authenticated user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
```

### 4.4 Register HTTP Routes

**File: `convex/http.ts`**

```typescript
import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

const http = httpRouter();

// Register Better Auth routes
authComponent.registerRoutes(http, createAuth);

export default http;
```

### 4.5 Create Client Auth Instance

**File: `src/lib/auth-client.ts`**

```typescript
import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
  plugins: [convexClient()],
});

// Export commonly used hooks
export const {
  useSession,
  signIn,
  signUp,
  signOut,
} = authClient;
```

### 4.6 Create Server Auth Utilities

**File: `src/lib/auth-server.ts`**

```typescript
import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

export const {
  handler,
  getToken,
  isAuthenticated,
  preloadAuthQuery,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
});
```

### 4.7 Create API Route Handler

**File: `src/app/api/auth/[...all]/route.ts`**

```typescript
import { handler } from "@/lib/auth-server";

export const { GET, POST } = handler;
```

### 4.8 Create Convex Client Provider

**File: `src/app/ConvexClientProvider.tsx`**

```typescript
"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken?: string | null;
}) {
  return (
    <ConvexBetterAuthProvider
      client={convex}
      authClient={authClient}
      initialToken={initialToken}
    >
      {children}
    </ConvexBetterAuthProvider>
  );
}
```

### 4.9 Update Root Layout

**File: `src/app/layout.tsx`** (update)

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trading Portfolio Dashboard",
  description: "Track your investments across stocks, ETFs, crypto, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
```

---

## 5. Phase 3: Database Schema Design

### 5.1 Define Convex Schema

**File: `convex/schema.ts`**

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

// Asset type union
const assetType = v.union(
  v.literal("stock"),
  v.literal("etf"),
  v.literal("crypto"),
  v.literal("metal"),
  v.literal("forex")
);

export default defineSchema({
  // Better Auth tables (auto-managed)
  ...authComponent.schema,

  // User holdings (portfolios)
  holdings: defineTable({
    userId: v.id("user"), // References Better Auth user
    symbol: v.string(),
    name: v.string(),
    type: assetType,
    quantity: v.number(),
    avgBuyPrice: v.number(),
    currentPrice: v.number(),
    value: v.number(),
    dayChange: v.number(),
    dayChangePercent: v.number(),
    totalReturn: v.number(),
    totalReturnPercent: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_symbol", ["userId", "symbol"])
    .index("by_userId_type", ["userId", "type"]),

  // User transactions history
  transactions: defineTable({
    userId: v.id("user"),
    holdingId: v.optional(v.id("holdings")),
    symbol: v.string(),
    type: v.union(v.literal("buy"), v.literal("sell")),
    quantity: v.number(),
    price: v.number(),
    total: v.number(),
    timestamp: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_timestamp", ["userId", "timestamp"])
    .index("by_holdingId", ["holdingId"]),

  // Portfolio snapshots for historical performance
  portfolioSnapshots: defineTable({
    userId: v.id("user"),
    totalValue: v.number(),
    dayChange: v.number(),
    dayChangePercent: v.number(),
    timestamp: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_timestamp", ["userId", "timestamp"]),

  // User watchlist
  watchlist: defineTable({
    userId: v.id("user"),
    symbol: v.string(),
    name: v.string(),
    type: assetType,
    addedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_symbol", ["userId", "symbol"]),
});
```

### 5.2 Create Holdings Functions

**File: `convex/holdings.ts`**

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

// Get all holdings for authenticated user
export const getHoldings = query({
  args: {
    type: v.optional(v.union(
      v.literal("stock"),
      v.literal("etf"),
      v.literal("crypto"),
      v.literal("metal"),
      v.literal("forex")
    )),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) return [];

    let query = ctx.db
      .query("holdings")
      .withIndex("by_userId", (q) => q.eq("userId", user._id));

    const holdings = await query.collect();

    if (args.type) {
      return holdings.filter((h) => h.type === args.type);
    }

    return holdings;
  },
});

// Get portfolio overview (aggregated metrics)
export const getPortfolioOverview = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) return null;

    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    if (holdings.length === 0) {
      return {
        totalValue: 0,
        dayChange: 0,
        dayChangePercent: 0,
        totalReturn: 0,
        totalReturnPercent: 0,
        totalCost: 0,
      };
    }

    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const dayChange = holdings.reduce((sum, h) => sum + h.dayChange * h.quantity, 0);
    const totalCost = holdings.reduce((sum, h) => sum + h.avgBuyPrice * h.quantity, 0);
    const totalReturn = totalValue - totalCost;

    return {
      totalValue,
      dayChange,
      dayChangePercent: totalValue > 0 ? (dayChange / totalValue) * 100 : 0,
      totalReturn,
      totalReturnPercent: totalCost > 0 ? (totalReturn / totalCost) * 100 : 0,
      totalCost,
    };
  },
});

// Get asset allocation breakdown
export const getAssetAllocation = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) return [];

    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

    // Group by asset type
    const allocationMap = holdings.reduce((acc, h) => {
      acc[h.type] = (acc[h.type] || 0) + h.value;
      return acc;
    }, {} as Record<string, number>);

    const assetColors: Record<string, string> = {
      stock: "hsl(var(--chart-1))",
      etf: "hsl(var(--chart-2))",
      crypto: "hsl(var(--chart-3))",
      metal: "hsl(var(--chart-4))",
      forex: "hsl(var(--chart-5))",
    };

    return Object.entries(allocationMap).map(([type, value]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      type,
      value,
      percentage: totalValue > 0 ? (value / totalValue) * 100 : 0,
      fill: assetColors[type] || "hsl(var(--muted))",
    }));
  },
});

// Add a new holding
export const addHolding = mutation({
  args: {
    symbol: v.string(),
    name: v.string(),
    type: v.union(
      v.literal("stock"),
      v.literal("etf"),
      v.literal("crypto"),
      v.literal("metal"),
      v.literal("forex")
    ),
    quantity: v.number(),
    avgBuyPrice: v.number(),
    currentPrice: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const value = args.quantity * args.currentPrice;
    const totalCost = args.quantity * args.avgBuyPrice;
    const totalReturn = value - totalCost;

    return await ctx.db.insert("holdings", {
      userId: user._id,
      symbol: args.symbol,
      name: args.name,
      type: args.type,
      quantity: args.quantity,
      avgBuyPrice: args.avgBuyPrice,
      currentPrice: args.currentPrice,
      value,
      dayChange: 0, // Would be updated by price feed
      dayChangePercent: 0,
      totalReturn,
      totalReturnPercent: totalCost > 0 ? (totalReturn / totalCost) * 100 : 0,
    });
  },
});

// Update holding quantity (buy more / sell)
export const updateHolding = mutation({
  args: {
    holdingId: v.id("holdings"),
    quantity: v.number(),
    avgBuyPrice: v.optional(v.number()),
    currentPrice: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const holding = await ctx.db.get(args.holdingId);
    if (!holding || holding.userId !== user._id) {
      throw new Error("Holding not found");
    }

    const avgBuyPrice = args.avgBuyPrice ?? holding.avgBuyPrice;
    const currentPrice = args.currentPrice ?? holding.currentPrice;
    const value = args.quantity * currentPrice;
    const totalCost = args.quantity * avgBuyPrice;
    const totalReturn = value - totalCost;

    await ctx.db.patch(args.holdingId, {
      quantity: args.quantity,
      avgBuyPrice,
      currentPrice,
      value,
      totalReturn,
      totalReturnPercent: totalCost > 0 ? (totalReturn / totalCost) * 100 : 0,
    });
  },
});

// Delete a holding
export const deleteHolding = mutation({
  args: {
    holdingId: v.id("holdings"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const holding = await ctx.db.get(args.holdingId);
    if (!holding || holding.userId !== user._id) {
      throw new Error("Holding not found");
    }

    await ctx.db.delete(args.holdingId);
  },
});
```

### 5.3 Create Performance Data Functions

**File: `convex/performance.ts`**

```typescript
import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { authComponent } from "./auth";

// Get historical performance data
export const getPerformanceData = query({
  args: {
    months: v.optional(v.number()), // 3, 6, or 12
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) return [];

    const months = args.months || 12;
    const startTime = Date.now() - months * 30 * 24 * 60 * 60 * 1000;

    const snapshots = await ctx.db
      .query("portfolioSnapshots")
      .withIndex("by_userId_timestamp", (q) =>
        q.eq("userId", user._id).gte("timestamp", startTime)
      )
      .collect();

    return snapshots.map((s) => ({
      date: new Date(s.timestamp).toISOString().split("T")[0],
      value: s.totalValue,
    }));
  },
});

// Record daily snapshot (called by cron or manually)
export const recordSnapshot = internalMutation({
  args: {
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    const holdings = await ctx.db
      .query("holdings")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const dayChange = holdings.reduce((sum, h) => sum + h.dayChange * h.quantity, 0);

    await ctx.db.insert("portfolioSnapshots", {
      userId: args.userId,
      totalValue,
      dayChange,
      dayChangePercent: totalValue > 0 ? (dayChange / totalValue) * 100 : 0,
      timestamp: Date.now(),
    });
  },
});
```

---

## 6. Phase 4: Auth UI Components

### 6.1 Create Auth UI Provider

**File: `src/components/auth-ui-provider.tsx`**

```typescript
"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthUIProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      Link={Link}
    >
      {children}
    </AuthUIProvider>
  );
}
```

### 6.2 Update Convex Client Provider

Update `src/app/ConvexClientProvider.tsx` to include AuthUIProvider:

```typescript
"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken?: string | null;
}) {
  const router = useRouter();

  return (
    <ConvexBetterAuthProvider
      client={convex}
      authClient={authClient}
      initialToken={initialToken}
    >
      <AuthUIProvider
        authClient={authClient}
        navigate={router.push}
        replace={router.replace}
        onSessionChange={() => router.refresh()}
        Link={Link}
      >
        {children}
      </AuthUIProvider>
    </ConvexBetterAuthProvider>
  );
}
```

### 6.3 Create Auth Pages

**File: `src/app/auth/[pathname]/page.tsx`**

```typescript
import { AuthView } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string }>;
}) {
  const { pathname } = await params;

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <AuthView pathname={pathname} />
    </main>
  );
}
```

This creates these routes automatically:
- `/auth/sign-in` - Sign in page
- `/auth/sign-up` - Sign up page
- `/auth/forgot-password` - Password reset request
- `/auth/reset-password` - Password reset form
- `/auth/verify-email` - Email verification

### 6.4 Create Account Settings Page

**File: `src/app/settings/page.tsx`**

```typescript
import { AccountSettingsCards } from "@daveyplate/better-auth-ui";

export default function SettingsPage() {
  return (
    <main className="container mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
      <AccountSettingsCards />
    </main>
  );
}
```

---

## 7. Phase 5: Data Migration

### 7.1 Create Seed Script

**File: `convex/seed.ts`**

```typescript
import { mutation } from "./_generated/server";
import { authComponent } from "./auth";

// Seed data for demo/development
export const seedDemoData = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    // Check if user already has holdings
    const existingHoldings = await ctx.db
      .query("holdings")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();

    if (existingHoldings) {
      throw new Error("User already has holdings. Clear them first.");
    }

    // Demo holdings data (from original trading-data.ts)
    const holdings = [
      { symbol: "AAPL", name: "Apple Inc.", type: "stock" as const, quantity: 50, avgBuyPrice: 145.00, currentPrice: 178.50 },
      { symbol: "MSFT", name: "Microsoft Corporation", type: "stock" as const, quantity: 30, avgBuyPrice: 280.00, currentPrice: 378.25 },
      { symbol: "GOOGL", name: "Alphabet Inc.", type: "stock" as const, quantity: 15, avgBuyPrice: 105.00, currentPrice: 141.80 },
      { symbol: "NVDA", name: "NVIDIA Corporation", type: "stock" as const, quantity: 25, avgBuyPrice: 220.00, currentPrice: 495.50 },
      { symbol: "TSLA", name: "Tesla Inc.", type: "stock" as const, quantity: 20, avgBuyPrice: 180.00, currentPrice: 248.75 },
      { symbol: "SPY", name: "SPDR S&P 500 ETF", type: "etf" as const, quantity: 40, avgBuyPrice: 420.00, currentPrice: 478.90 },
      { symbol: "QQQ", name: "Invesco QQQ Trust", type: "etf" as const, quantity: 35, avgBuyPrice: 340.00, currentPrice: 405.60 },
      { symbol: "VTI", name: "Vanguard Total Stock Market ETF", type: "etf" as const, quantity: 60, avgBuyPrice: 210.00, currentPrice: 242.30 },
      { symbol: "BTC", name: "Bitcoin", type: "crypto" as const, quantity: 0.5, avgBuyPrice: 35000.00, currentPrice: 67500.00 },
      { symbol: "ETH", name: "Ethereum", type: "crypto" as const, quantity: 3, avgBuyPrice: 2200.00, currentPrice: 3650.00 },
      { symbol: "SOL", name: "Solana", type: "crypto" as const, quantity: 50, avgBuyPrice: 45.00, currentPrice: 145.80 },
      { symbol: "ADA", name: "Cardano", type: "crypto" as const, quantity: 5000, avgBuyPrice: 0.35, currentPrice: 0.62 },
      { symbol: "GLD", name: "SPDR Gold Shares", type: "metal" as const, quantity: 25, avgBuyPrice: 175.00, currentPrice: 218.50 },
      { symbol: "SLV", name: "iShares Silver Trust", type: "metal" as const, quantity: 100, avgBuyPrice: 21.00, currentPrice: 25.80 },
      { symbol: "PALL", name: "Aberdeen Palladium ETF", type: "metal" as const, quantity: 15, avgBuyPrice: 180.00, currentPrice: 115.40 },
      { symbol: "EUR/USD", name: "Euro/US Dollar", type: "forex" as const, quantity: 10000, avgBuyPrice: 1.05, currentPrice: 1.085 },
      { symbol: "GBP/USD", name: "British Pound/US Dollar", type: "forex" as const, quantity: 8000, avgBuyPrice: 1.22, currentPrice: 1.268 },
      { symbol: "USD/JPY", name: "US Dollar/Japanese Yen", type: "forex" as const, quantity: 500000, avgBuyPrice: 0.0071, currentPrice: 0.0067 },
    ];

    // Insert all holdings
    for (const holding of holdings) {
      const value = holding.quantity * holding.currentPrice;
      const totalCost = holding.quantity * holding.avgBuyPrice;
      const totalReturn = value - totalCost;
      const dayChange = (Math.random() - 0.5) * holding.currentPrice * 0.05;

      await ctx.db.insert("holdings", {
        userId: user._id,
        symbol: holding.symbol,
        name: holding.name,
        type: holding.type,
        quantity: holding.quantity,
        avgBuyPrice: holding.avgBuyPrice,
        currentPrice: holding.currentPrice,
        value,
        dayChange,
        dayChangePercent: (dayChange / holding.currentPrice) * 100,
        totalReturn,
        totalReturnPercent: totalCost > 0 ? (totalReturn / totalCost) * 100 : 0,
      });
    }

    // Create some historical snapshots (last 12 months)
    const baseValue = 150000;
    for (let i = 12; i >= 0; i--) {
      const timestamp = Date.now() - i * 30 * 24 * 60 * 60 * 1000;
      const growthFactor = 1 + (12 - i) * 0.02 + (Math.random() - 0.5) * 0.05;
      const totalValue = baseValue * growthFactor;
      const dayChange = (Math.random() - 0.5) * totalValue * 0.02;

      await ctx.db.insert("portfolioSnapshots", {
        userId: user._id,
        totalValue,
        dayChange,
        dayChangePercent: (dayChange / totalValue) * 100,
        timestamp,
      });
    }

    return { success: true, holdingsCount: holdings.length };
  },
});
```

---

## 8. Phase 6: Protected Routes & User Scoping

### 8.1 Create Auth Boundary Component

**File: `src/components/auth-boundary.tsx`**

```typescript
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function AuthBoundary({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
```

### 8.2 Protect Dashboard Layout

**Update: `src/app/dashboard/layout.tsx`**

```typescript
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { AuthBoundary } from "@/components/auth-boundary";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthBoundary>
      <SidebarProvider>
        <DashboardSidebar />
        {children}
      </SidebarProvider>
    </AuthBoundary>
  );
}
```

---

## 9. Phase 7: Dashboard Updates

### 9.1 Update Dashboard Sidebar with Real User Data

**Update: `src/components/dashboard/dashboard-sidebar.tsx`**

Key changes:
- Import `useSession` from auth-client
- Replace hard-coded user with session data
- Add sign-out functionality

```typescript
"use client";

import { useSession, signOut } from "@/lib/auth-client";
// ... other imports

export function DashboardSidebar() {
  const { data: session } = useSession();

  // Use session data instead of hard-coded values
  const user = session?.user;

  return (
    <Sidebar>
      {/* ... existing sidebar content ... */}

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.image || undefined}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || "User"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => signOut()}>
                  <SignOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
```

### 9.2 Update Portfolio Overview Component

**Update: `src/components/dashboard/portfolio-overview.tsx`**

```typescript
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatCurrency, formatPercent } from "@/lib/utils";
// ... other imports

export function PortfolioOverview() {
  const overview = useQuery(api.holdings.getPortfolioOverview);

  if (!overview) {
    return <PortfolioOverviewSkeleton />;
  }

  const metrics = [
    {
      title: "Total Portfolio Value",
      value: formatCurrency(overview.totalValue),
      // ... rest of metric config
    },
    // ... other metrics using overview data
  ];

  return (
    // ... existing JSX structure
  );
}
```

### 9.3 Update Holdings Table Component

**Update: `src/components/dashboard/holdings-table.tsx`**

```typescript
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// ... other imports

export function HoldingsTable() {
  const [selectedType, setSelectedType] = useState<string>("all");

  const holdings = useQuery(
    api.holdings.getHoldings,
    selectedType === "all" ? {} : { type: selectedType as any }
  );

  if (!holdings) {
    return <HoldingsTableSkeleton />;
  }

  // ... rest of component using holdings data
}
```

### 9.4 Update Charts

**Update: `src/components/dashboard/portfolio-performance-chart.tsx`**

```typescript
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// ... other imports

export function PortfolioPerformanceChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y");

  const months = timeRange === "3M" ? 3 : timeRange === "6M" ? 6 : 12;
  const performanceData = useQuery(api.performance.getPerformanceData, { months });

  if (!performanceData) {
    return <ChartSkeleton />;
  }

  // ... rest of component
}
```

**Update: `src/components/dashboard/asset-allocation-chart.tsx`**

```typescript
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// ... other imports

export function AssetAllocationChart() {
  const assetAllocation = useQuery(api.holdings.getAssetAllocation);

  if (!assetAllocation) {
    return <ChartSkeleton />;
  }

  // ... rest of component
}
```

### 9.5 Move Utility Functions

Keep `formatCurrency` and `formatPercent` in `src/lib/utils.ts`:

```typescript
// Add to existing utils.ts

export function formatCurrency(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}
```

---

## 10. Testing & Validation

### 10.1 Development Testing Checklist

- [ ] Convex dev server starts without errors (`npx convex dev`)
- [ ] Next.js dev server starts without errors (`npm run dev`)
- [ ] Sign up flow works (creates user in Convex)
- [ ] Sign in flow works (authenticates user)
- [ ] Sign out flow works (clears session)
- [ ] Dashboard redirects to sign-in when not authenticated
- [ ] Dashboard shows user data when authenticated
- [ ] Holdings table displays user-specific data
- [ ] Charts display user-specific data
- [ ] Real-time updates work (change data in Convex dashboard, see update in UI)

### 10.2 Run Development Servers

```bash
# Terminal 1: Start Convex dev server
npx convex dev

# Terminal 2: Start Next.js dev server
npm run dev
```

### 10.3 Seed Demo Data

After signing up, run the seed mutation from the Convex dashboard or create a button:

```typescript
// In a component or page
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const seedData = useMutation(api.seed.seedDemoData);

// Call seedData() to populate demo holdings
```

---

## 11. File Changes Summary

### New Files to Create

```
convex/
├── auth.config.ts          # Better Auth config provider
├── auth.ts                 # Better Auth instance + component client
├── http.ts                 # HTTP routes for auth
├── schema.ts               # Database schema
├── holdings.ts             # Holdings queries/mutations
├── performance.ts          # Performance data functions
├── seed.ts                 # Demo data seeding
└── betterAuth/             # Auto-generated by component install

src/
├── app/
│   ├── ConvexClientProvider.tsx    # Convex + Auth provider
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts        # Auth API routes
│   └── auth/
│       └── [pathname]/
│           └── page.tsx            # Auth pages (sign-in, sign-up, etc.)
├── components/
│   └── auth-boundary.tsx           # Protected route wrapper
└── lib/
    ├── auth-client.ts              # Client-side auth
    └── auth-server.ts              # Server-side auth utilities
```

### Files to Modify

```
src/
├── app/
│   ├── layout.tsx                  # Add ConvexClientProvider
│   └── dashboard/
│       └── layout.tsx              # Add AuthBoundary
├── components/
│   └── dashboard/
│       ├── dashboard-sidebar.tsx   # Use session data
│       ├── portfolio-overview.tsx  # Use Convex queries
│       ├── holdings-table.tsx      # Use Convex queries
│       ├── portfolio-performance-chart.tsx  # Use Convex queries
│       └── asset-allocation-chart.tsx       # Use Convex queries
└── lib/
    └── utils.ts                    # Add formatCurrency, formatPercent

next.config.ts                      # Add convex to eslint dirs
.env.local                          # Add environment variables
```

### Files to Remove (Optional)

```
src/lib/trading-data.ts             # Replace with Convex queries
                                    # (keep for reference during migration)
```

---

## Next Steps After Implementation

1. **Add OAuth Providers** (optional)
   - Configure GitHub/Google OAuth in Better Auth
   - Add social login buttons to auth pages

2. **Add Email Verification** (production)
   - Set `requireEmailVerification: true` in Better Auth config
   - Configure email provider (Resend, SendGrid, etc.)

3. **Add Price Updates** (advanced)
   - Integrate with a price feed API (Alpha Vantage, Finnhub, etc.)
   - Create scheduled function to update prices

4. **Add Transactions Feature**
   - Build transaction recording UI
   - Implement buy/sell mutations

5. **Add Watchlist Feature**
   - Build watchlist UI
   - Implement watchlist mutations

---

## Troubleshooting

### Common Issues

1. **"CONVEX_URL not set" error**
   - Ensure `.env.local` exists with `NEXT_PUBLIC_CONVEX_URL`
   - Restart Next.js dev server after changing env vars

2. **Auth redirects not working**
   - Check `SITE_URL` is set in Convex environment
   - Verify API route handler is at correct path

3. **Session not persisting**
   - Check browser cookies are enabled
   - Verify `BETTER_AUTH_SECRET` is set in Convex

4. **Real-time updates not working**
   - Ensure using `useQuery` hook (not `fetchQuery`)
   - Check Convex WebSocket connection in browser devtools

---

This implementation plan provides a complete roadmap for integrating Better Auth and Convex into the trading portfolio dashboard. Follow the phases in order, testing at each step to ensure everything works correctly.
