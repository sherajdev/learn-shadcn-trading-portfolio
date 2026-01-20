'use client';

import Link from 'next/link';
import { ChartPieSlice } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ChartPieSlice className="h-5 w-5" weight="fill" />
          </div>
          <span className="text-lg font-semibold">Portfolio Tracker</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <ThemeToggle />
          <Button asChild>
            <Link href="/dashboard">
              View Dashboard
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
