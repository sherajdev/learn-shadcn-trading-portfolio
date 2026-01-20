export default function PortfoliosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Portfolios</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          New Portfolio
        </button>
      </div>
      <div className="p-6 bg-card rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Your Portfolios</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Default Portfolio</h4>
            <p className="text-sm text-muted-foreground mt-1">
              No positions yet. Add your first trade to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
