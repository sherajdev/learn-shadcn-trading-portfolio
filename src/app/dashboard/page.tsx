import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { PortfolioPerformanceChart } from "@/components/dashboard/portfolio-performance-chart"
import { AssetAllocationChart } from "@/components/dashboard/asset-allocation-chart"
import { HoldingsTable } from "@/components/dashboard/holdings-table"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Investment Portfolio" />

      <main className="flex-1 space-y-6 p-4 md:p-6">
        {/* Portfolio Overview */}
        <PortfolioOverview />

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-7">
          <PortfolioPerformanceChart className="lg:col-span-4" />
          <AssetAllocationChart className="lg:col-span-3" />
        </div>

        {/* Holdings Table */}
        <HoldingsTable />
      </main>
    </div>
  )
}
