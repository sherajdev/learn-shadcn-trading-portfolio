'use client';

import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { holdingsColumns } from './holdings-table-columns';
import { getHoldingsByType, AssetType } from '@/lib/trading-data';

const assetTypes = [
  { value: 'all', label: 'All Assets' },
  { value: 'stock', label: 'Stocks' },
  { value: 'etf', label: 'ETFs' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'metal', label: 'Metals' },
  { value: 'forex', label: 'Forex' },
];

export function HoldingsTable() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'value', desc: true },
  ]);

  const data = selectedType === 'all'
    ? getHoldingsByType()
    : getHoldingsByType(selectedType as AssetType);

  const table = useReactTable({
    data,
    columns: holdingsColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Holdings</CardTitle>
            <CardDescription>
              All your investments across different asset classes
            </CardDescription>
          </div>
          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-6">
              {assetTypes.map((type) => (
                <TabsTrigger key={type.value} value={type.value} className="text-xs">
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={holdingsColumns.length}
                    className="h-24 text-center"
                  >
                    No holdings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} holding(s)
        </div>
      </CardContent>
    </Card>
  );
}
