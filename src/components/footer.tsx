import { GithubLogo, TwitterLogo, Heart } from "@phosphor-icons/react/dist/ssr"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" weight="fill" />
            <span>using</span>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              shadcn/ui
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shadcn/ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubLogo className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://twitter.com/shadcn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <TwitterLogo className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            A learning project for NextJS + shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  )
}
