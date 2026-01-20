'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Holding, formatCurrency, formatPercent } from '@/lib/trading-data';
import { Badge } from '@/components/ui/badge';
import { TrendUp, TrendDown } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

const assetTypeColors: Record<string, string> = {
  stock: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
  etf: 'bg-chart-2/10 text-chart-2 border-chart-2/20',
  crypto: 'bg-primary/10 text-primary border-primary/20',
  metal: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
  forex: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
};

export const holdingsColumns: ColumnDef<Holding>[] = [
  {
    accessorKey: 'symbol',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Symbol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.getValue('symbol')}</span>
        <span className="text-xs text-muted-foreground">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return (
        <Badge variant="outline" className={assetTypeColors[type]}>
          {type.toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity = row.getValue('quantity') as number;
      return <div className="text-right">{quantity.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: 'avgBuyPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Avg. Buy
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue('avgBuyPrice') as number;
      return <div className="text-right">{formatCurrency(price)}</div>;
    },
  },
  {
    accessorKey: 'currentPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Current Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue('currentPrice') as number;
      return <div className="text-right font-medium">{formatCurrency(price)}</div>;
    },
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Market Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue('value') as number;
      return <div className="text-right font-semibold">{formatCurrency(value, 0)}</div>;
    },
  },
  {
    accessorKey: 'changePercent',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          24h Change
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const changePercent = row.original.changePercent;
      const change24h = row.original.change24h;
      const isPositive = changePercent >= 0;

      return (
        <div className={`flex items-center gap-1 ${isPositive ? 'text-status-success' : 'text-status-error'}`}>
          {isPositive ? (
            <TrendUp className="h-4 w-4" weight="bold" />
          ) : (
            <TrendDown className="h-4 w-4" weight="bold" />
          )}
          <div className="flex flex-col items-end">
            <span className="font-medium">{formatPercent(changePercent)}</span>
            <span className="text-xs">{formatCurrency(change24h)}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'totalReturnPercent',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2"
        >
          Total Return
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalReturnPercent = row.original.totalReturnPercent;
      const totalReturn = row.original.totalReturn;
      const isPositive = totalReturnPercent >= 0;

      return (
        <div className={`flex items-center gap-1 ${isPositive ? 'text-status-success' : 'text-status-error'}`}>
          {isPositive ? (
            <TrendUp className="h-4 w-4" weight="bold" />
          ) : (
            <TrendDown className="h-4 w-4" weight="bold" />
          )}
          <div className="flex flex-col items-end">
            <span className="font-medium">{formatPercent(totalReturnPercent)}</span>
            <span className="text-xs">{formatCurrency(totalReturn)}</span>
          </div>
        </div>
      );
    },
  },
];
