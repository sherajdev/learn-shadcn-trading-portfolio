export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Portfolio Value</h3>
          <p className="text-2xl font-bold mt-2">$0.00</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Daily P&L</h3>
          <p className="text-2xl font-bold mt-2">$0.00</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Open Positions</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Win Rate</h3>
          <p className="text-2xl font-bold mt-2">0%</p>
        </div>
      </div>
      <div className="p-6 bg-card rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-muted-foreground">No recent activity to display.</p>
      </div>
    </div>
  );
}
