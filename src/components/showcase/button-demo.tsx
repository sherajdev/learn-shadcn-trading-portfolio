"use client"

import { Button } from "@/components/ui/button"
import { Heart, ArrowRight, Download } from "@phosphor-icons/react"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button>
        <Heart className="mr-2 h-4 w-4" weight="fill" />
        Like
      </Button>
      <Button>
        Download
        <Download className="ml-2 h-4 w-4" />
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}
