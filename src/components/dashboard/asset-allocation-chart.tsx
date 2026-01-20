'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { assetAllocation, formatCurrency } from '@/lib/trading-data';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AssetAllocationChartProps {
  className?: string;
}

export function AssetAllocationChart({ className }: AssetAllocationChartProps) {
  const chartData = assetAllocation.map(asset => ({
    name: asset.type.toUpperCase(),
    value: asset.value,
    percentage: asset.percentage,
    fill: asset.color,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-md">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm font-medium text-primary">
            {payload[0].payload.percentage.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium">{entry.value}</span>
              <span className="text-xs text-muted-foreground">
                {entry.payload.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <CardDescription>Portfolio distribution by asset type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
