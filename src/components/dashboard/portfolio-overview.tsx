'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatPercent, portfolioOverview } from '@/lib/trading-data';
import { TrendUp, TrendDown, Wallet, ChartLine, Target, Coins } from '@phosphor-icons/react';

export function PortfolioOverview() {
  const metrics = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(portfolioOverview.totalValue),
      icon: Wallet,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Return',
      value: formatCurrency(portfolioOverview.totalReturn),
      change: formatPercent(portfolioOverview.totalReturnPercent),
      icon: portfolioOverview.totalReturn >= 0 ? TrendUp : TrendDown,
      iconColor: portfolioOverview.totalReturn >= 0 ? 'text-green-500' : 'text-red-500',
      bgColor: portfolioOverview.totalReturn >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
      trend: portfolioOverview.totalReturn >= 0 ? 'up' : 'down',
    },
    {
      title: 'Today\'s Change',
      value: formatCurrency(portfolioOverview.dayChange),
      change: formatPercent(portfolioOverview.dayChangePercent),
      icon: portfolioOverview.dayChange >= 0 ? TrendUp : TrendDown,
      iconColor: portfolioOverview.dayChange >= 0 ? 'text-green-500' : 'text-red-500',
      bgColor: portfolioOverview.dayChange >= 0 ? 'bg-green-500/10' : 'bg-red-500/10',
      trend: portfolioOverview.dayChange >= 0 ? 'up' : 'down',
    },
    {
      title: 'Total Invested',
      value: formatCurrency(portfolioOverview.totalInvested),
      icon: Coins,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-5 w-5 ${metric.iconColor}`} weight="duotone" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            {metric.change && (
              <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mt-1 flex items-center gap-1`}>
                {metric.trend === 'up' ? (
                  <TrendUp className="h-3 w-3" weight="bold" />
                ) : (
                  <TrendDown className="h-3 w-3" weight="bold" />
                )}
                {metric.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
