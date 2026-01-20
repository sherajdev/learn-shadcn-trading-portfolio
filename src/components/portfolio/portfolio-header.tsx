"use client"

import Link from "next/link"
import { House } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function PortfolioHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <h1 className="text-lg font-semibold">Portfolio</h1>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        {/* Icon only on mobile, full button on larger screens */}
        <Button size="icon" variant="outline" asChild className="sm:hidden">
          <Link href="/">
            <House className="size-4" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
        <Button size="sm" asChild className="hidden sm:inline-flex">
          <Link href="/">
            <House className="mr-2 size-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </header>
  )
}
