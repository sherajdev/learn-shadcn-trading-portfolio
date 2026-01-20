import { Card, CardHeader, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "@phosphor-icons/react/dist/ssr"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating,
}: TestimonialCardProps) {
  return (
    <Card className="border-border/50 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} weight="fill" className="w-4 h-4 text-yellow-500" />
          ))}
        </div>
        <CardDescription className="text-base text-foreground/80 leading-relaxed">
          "{quote}"
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {author.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
