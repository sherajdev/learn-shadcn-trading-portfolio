'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { performanceData, formatCurrency } from '@/lib/trading-data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

type TimeRange = '3M' | '6M' | '1Y';

interface PortfolioPerformanceChartProps {
  className?: string;
}

export function PortfolioPerformanceChart({ className }: PortfolioPerformanceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('1Y');

  const getFilteredData = () => {
    const now = new Date();
    const months = timeRange === '3M' ? 3 : timeRange === '6M' ? 6 : 12;
    return performanceData.slice(-months);
  };

  const chartData = getFilteredData().map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    value: item.value,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="text-sm font-medium text-card-foreground">{payload[0].payload.date}</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(payload[0].value, 0)}
          </p>
        </div>
      );
    }
    return null;
  };

  const timeRanges: TimeRange[] = ['3M', '6M', '1Y'];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Historical portfolio value over time</CardDescription>
          </div>
          <div className="flex gap-1 rounded-lg border p-1">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              stroke="#374151"
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              stroke="#374151"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f59e0b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
