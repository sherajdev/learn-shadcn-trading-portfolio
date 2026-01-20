import { Icon } from "@phosphor-icons/react"

interface StatCardProps {
  icon: Icon
  value: string
  label: string
}

export function StatCard({ icon: IconComponent, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <IconComponent className="w-5 h-5 text-primary" weight="bold" />
        <div className="text-3xl md:text-4xl font-bold">{value}</div>
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

interface PortfolioStatsProps {
  stats: Array<{ label: string; value: string; icon: Icon }>
}

export function PortfolioStats({ stats }: PortfolioStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 md:gap-8 mt-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
