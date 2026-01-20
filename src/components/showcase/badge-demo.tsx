import { Badge } from "@/components/ui/badge"
import { Check, Warning, X, Info } from "@phosphor-icons/react/dist/ssr"

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge className="bg-green-500 hover:bg-green-600">
        <Check className="mr-1 h-3 w-3" />
        Success
      </Badge>
      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">
        <Warning className="mr-1 h-3 w-3" />
        Warning
      </Badge>
      <Badge variant="destructive">
        <X className="mr-1 h-3 w-3" />
        Error
      </Badge>
      <Badge variant="outline">
        <Info className="mr-1 h-3 w-3" />
        Info
      </Badge>
      <Badge>v2.0.0</Badge>
      <Badge variant="secondary">New Feature</Badge>
    </div>
  )
}
