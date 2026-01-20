import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatCardsGrid } from "@/components/dashboard/stat-cards-grid"
import { VisitorsChart } from "@/components/dashboard/visitors-chart"
import { DataTable } from "@/components/dashboard/data-table"
import { columns } from "@/components/dashboard/data-table-columns"
import { customers } from "@/lib/dashboard-data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Dashboard" />

      <main className="flex-1 space-y-6 p-4 md:p-6">
        {/* Stat Cards */}
        <StatCardsGrid />

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-7">
          <VisitorsChart className="lg:col-span-4" />
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions from your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "Alice", action: "Created new project", time: "2 min ago" },
                  { user: "Bob", action: "Updated dashboard", time: "5 min ago" },
                  { user: "Carol", action: "Deployed to production", time: "10 min ago" },
                  { user: "David", action: "Fixed critical bug", time: "25 min ago" },
                  { user: "Eva", action: "Added new feature", time: "1 hour ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex size-8 items-center justify-center bg-primary text-primary-foreground text-xs font-medium">
                      {activity.user[0]}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>
              A list of your recent customers and their activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={customers} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
