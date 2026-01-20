import { StatCard } from "./stat-card"
import { stats } from "@/lib/dashboard-data"

export function StatCardsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeLabel={stat.changeLabel}
        />
      ))}
    </div>
  )
}
