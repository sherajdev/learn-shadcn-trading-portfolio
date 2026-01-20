import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "@phosphor-icons/react/dist/ssr"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pro Plan</CardTitle>
          <Badge>Popular</Badge>
        </div>
        <CardDescription>
          Everything you need to scale your business
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold">
          $29<span className="text-sm font-normal text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" weight="fill" />
            Unlimited projects
          </li>
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" weight="fill" />
            Priority support
          </li>
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" weight="fill" />
            Advanced analytics
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  )
}
