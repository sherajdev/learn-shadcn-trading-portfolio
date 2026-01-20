"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  const [progress1, setProgress1] = React.useState(0)
  const [progress2, setProgress2] = React.useState(45)
  const [progress3, setProgress3] = React.useState(100)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress1((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Uploading...</span>
          <span className="font-medium">{progress1}%</span>
        </div>
        <Progress value={progress1} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Storage used</span>
          <span className="font-medium">{progress2}%</span>
        </div>
        <Progress value={progress2} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Complete</span>
          <span className="font-medium text-green-600">{progress3}%</span>
        </div>
        <Progress value={progress3} className="[&>div]:bg-green-500" />
      </div>
    </div>
  )
}
