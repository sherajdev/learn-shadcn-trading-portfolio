"use client";

import { useEffect, useState } from "react";
import { useConvex } from "convex/react";

export default function DashboardPage() {
  const convex = useConvex();
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const [holdings, setHoldings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Seed database and get portfolio
  const seedDatabase = async () => {
    try {
      const result = await convex.mutations.seedDatabase({});
      if (result?.portfolioId) {
        setPortfolioId(result.portfolioId);
      }
    } catch (error) {
      console.log("Seed mutation not available yet - run npx convex dev");
    }
  };

  // Fetch holdings
  const fetchHoldings = async () => {
    try {
      const data = await convex.queries.getAllHoldings({});
      setHoldings(data || []);
    } catch (error) {
      console.log("Queries not available yet - run npx convex dev");
    }
  };

  useEffect(() => {
    const init = async () => {
      await seedDatabase();
      await fetchHoldings();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="animate-pulse space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.quantity * h.avgBuyPrice, 0);
  const totalPnl = totalValue - totalCost;
  const pnlPercentage = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Portfolio Value</h3>
          <p className="text-2xl font-bold mt-2">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Total P&L</h3>
          <p className={`text-2xl font-bold mt-2 ${totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
            {totalPnl >= 0 ? "+" : ""}${totalPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-sm ml-2">({pnlPercentage >= 0 ? "+" : ""}{pnlPercentage.toFixed(2)}%)</span>
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Open Positions</h3>
          <p className="text-2xl font-bold mt-2">{holdings.length}</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Win Rate</h3>
          <p className="text-2xl font-bold mt-2">-</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Holdings</h3>
          {holdings.length === 0 ? (
            <p className="text-muted-foreground">No holdings yet. Run `npx convex dev` to seed the database.</p>
          ) : (
            <div className="space-y-3">
              {holdings.map((holding) => (
                <div key={holding._id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{holding.symbol}</p>
                    <p className="text-sm text-muted-foreground">{holding.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(holding.quantity * holding.currentPrice).toLocaleString()}</p>
                    <p className={`text-sm ${holding.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {holding.change24h >= 0 ? "+" : ""}{holding.change24h}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Top Movers</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Gainers</h4>
              {holdings
                .filter((h) => h.change24h > 0)
                .sort((a, b) => b.change24h - a.change24h)
                .slice(0, 5)
                .map((h) => (
                  <div key={h._id} className="flex justify-between text-sm">
                    <span>{h.symbol}</span>
                    <span className="text-green-500">+{h.change24h}%</span>
                  </div>
                ))}
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Losers</h4>
              {holdings
                .filter((h) => h.change24h < 0)
                .sort((a, b) => a.change24h - b.change24h)
                .slice(0, 5)
                .map((h) => (
                  <div key={h._id} className="flex justify-between text-sm">
                    <span>{h.symbol}</span>
                    <span className="text-red-500">{h.change24h}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
