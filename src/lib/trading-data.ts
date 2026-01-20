export type AssetType = 'stock' | 'etf' | 'crypto' | 'metal' | 'forex';

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  value: number;
  change24h: number;
  changePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
}

export interface PortfolioOverview {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  totalInvested: number;
}

export interface AssetAllocation {
  type: AssetType;
  value: number;
  percentage: number;
  color: string;
}

export interface PerformanceData {
  date: string;
  value: number;
}

// Mock Holdings Data
export const holdings: Holding[] = [
  // Stocks
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    quantity: 50,
    avgBuyPrice: 150.25,
    currentPrice: 178.50,
    value: 8925.00,
    change24h: 2.30,
    changePercent: 1.31,
    totalReturn: 1412.50,
    totalReturnPercent: 18.80,
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    quantity: 30,
    avgBuyPrice: 320.00,
    currentPrice: 378.85,
    value: 11365.50,
    change24h: 4.20,
    changePercent: 1.12,
    totalReturn: 1765.50,
    totalReturnPercent: 18.40,
  },
  {
    id: '3',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    quantity: 25,
    avgBuyPrice: 125.50,
    currentPrice: 142.30,
    value: 3557.50,
    change24h: -1.80,
    changePercent: -1.25,
    totalReturn: 420.00,
    totalReturnPercent: 13.39,
  },
  {
    id: '4',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    quantity: 15,
    avgBuyPrice: 420.00,
    currentPrice: 875.50,
    value: 13132.50,
    change24h: 12.30,
    changePercent: 1.42,
    totalReturn: 6832.50,
    totalReturnPercent: 108.68,
  },
  {
    id: '5',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'stock',
    quantity: 20,
    avgBuyPrice: 245.00,
    currentPrice: 248.75,
    value: 4975.00,
    change24h: -3.50,
    changePercent: -1.39,
    totalReturn: 75.00,
    totalReturnPercent: 1.53,
  },

  // ETFs
  {
    id: '6',
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    type: 'etf',
    quantity: 40,
    avgBuyPrice: 420.00,
    currentPrice: 485.30,
    value: 19412.00,
    change24h: 2.80,
    changePercent: 0.58,
    totalReturn: 2612.00,
    totalReturnPercent: 15.55,
  },
  {
    id: '7',
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    type: 'etf',
    quantity: 35,
    avgBuyPrice: 350.00,
    currentPrice: 428.90,
    value: 15011.50,
    change24h: 3.20,
    changePercent: 0.75,
    totalReturn: 2761.50,
    totalReturnPercent: 22.51,
  },
  {
    id: '8',
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    type: 'etf',
    quantity: 50,
    avgBuyPrice: 215.00,
    currentPrice: 248.60,
    value: 12430.00,
    change24h: 1.50,
    changePercent: 0.61,
    totalReturn: 1680.00,
    totalReturnPercent: 15.63,
  },

  // Crypto
  {
    id: '9',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    quantity: 0.5,
    avgBuyPrice: 52000.00,
    currentPrice: 98450.00,
    value: 49225.00,
    change24h: 1850.00,
    changePercent: 1.92,
    totalReturn: 23225.00,
    totalReturnPercent: 89.33,
  },
  {
    id: '10',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    quantity: 5,
    avgBuyPrice: 2800.00,
    currentPrice: 3650.00,
    value: 18250.00,
    change24h: 85.00,
    changePercent: 2.38,
    totalReturn: 4250.00,
    totalReturnPercent: 30.36,
  },
  {
    id: '11',
    symbol: 'SOL',
    name: 'Solana',
    type: 'crypto',
    quantity: 100,
    avgBuyPrice: 95.00,
    currentPrice: 148.75,
    value: 14875.00,
    change24h: 3.20,
    changePercent: 2.20,
    totalReturn: 5375.00,
    totalReturnPercent: 56.58,
  },
  {
    id: '12',
    symbol: 'ADA',
    name: 'Cardano',
    type: 'crypto',
    quantity: 10000,
    avgBuyPrice: 0.45,
    currentPrice: 0.98,
    value: 9800.00,
    change24h: 0.03,
    changePercent: 3.16,
    totalReturn: 5300.00,
    totalReturnPercent: 117.78,
  },

  // Metals
  {
    id: '13',
    symbol: 'GLD',
    name: 'Gold (Troy Ounce)',
    type: 'metal',
    quantity: 10,
    avgBuyPrice: 1850.00,
    currentPrice: 2068.50,
    value: 20685.00,
    change24h: 12.30,
    changePercent: 0.60,
    totalReturn: 2185.00,
    totalReturnPercent: 11.81,
  },
  {
    id: '14',
    symbol: 'SLV',
    name: 'Silver (Troy Ounce)',
    type: 'metal',
    quantity: 500,
    avgBuyPrice: 22.50,
    currentPrice: 28.75,
    value: 14375.00,
    change24h: 0.35,
    changePercent: 1.23,
    totalReturn: 3125.00,
    totalReturnPercent: 27.78,
  },
  {
    id: '15',
    symbol: 'PALL',
    name: 'Palladium (Troy Ounce)',
    type: 'metal',
    quantity: 2,
    avgBuyPrice: 1650.00,
    currentPrice: 1025.00,
    value: 2050.00,
    change24h: -15.00,
    changePercent: -1.44,
    totalReturn: -1250.00,
    totalReturnPercent: -37.88,
  },

  // Forex
  {
    id: '16',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    type: 'forex',
    quantity: 50000,
    avgBuyPrice: 1.0850,
    currentPrice: 1.0925,
    value: 54625.00,
    change24h: 0.0015,
    changePercent: 0.14,
    totalReturn: 375.00,
    totalReturnPercent: 0.69,
  },
  {
    id: '17',
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    type: 'forex',
    quantity: 30000,
    avgBuyPrice: 1.2650,
    currentPrice: 1.2780,
    value: 38340.00,
    change24h: 0.0025,
    changePercent: 0.20,
    totalReturn: 390.00,
    totalReturnPercent: 1.03,
  },
  {
    id: '18',
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    type: 'forex',
    quantity: 5000000,
    avgBuyPrice: 0.0068,
    currentPrice: 0.0069,
    value: 34500.00,
    change24h: -0.00005,
    changePercent: -0.72,
    totalReturn: 500.00,
    totalReturnPercent: 1.47,
  },
];

// Calculate Portfolio Overview
const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
const totalInvested = holdings.reduce((sum, h) => sum + (h.quantity * h.avgBuyPrice), 0);
const totalReturn = totalValue - totalInvested;
const totalReturnPercent = (totalReturn / totalInvested) * 100;
const dayChange = holdings.reduce((sum, h) => sum + (h.change24h * h.quantity), 0);
const dayChangePercent = (dayChange / totalValue) * 100;

export const portfolioOverview: PortfolioOverview = {
  totalValue,
  dayChange,
  dayChangePercent,
  totalReturn,
  totalReturnPercent,
  totalInvested,
};

// Calculate Asset Allocation
const assetColors: Record<AssetType, string> = {
  stock: 'hsl(var(--chart-1))',
  etf: 'hsl(var(--chart-2))',
  crypto: 'hsl(var(--primary))',
  metal: 'hsl(var(--chart-3))',
  forex: 'hsl(var(--chart-4))',
};

export const assetAllocation: AssetAllocation[] = Object.entries(
  holdings.reduce((acc, holding) => {
    acc[holding.type] = (acc[holding.type] || 0) + holding.value;
    return acc;
  }, {} as Record<AssetType, number>)
).map(([type, value]) => ({
  type: type as AssetType,
  value,
  percentage: (value / totalValue) * 100,
  color: assetColors[type as AssetType],
}));

// Performance Data (12 months)
export const performanceData: PerformanceData[] = [
  { date: '2025-02', value: 285000 },
  { date: '2025-03', value: 292000 },
  { date: '2025-04', value: 288000 },
  { date: '2025-05', value: 295000 },
  { date: '2025-06', value: 303000 },
  { date: '2025-07', value: 298000 },
  { date: '2025-08', value: 310000 },
  { date: '2025-09', value: 318000 },
  { date: '2025-10', value: 325000 },
  { date: '2025-11', value: 320000 },
  { date: '2025-12', value: 332000 },
  { date: '2026-01', value: totalValue },
];

// Helper function to get holdings by type
export function getHoldingsByType(type?: AssetType): Holding[] {
  if (!type) return holdings;
  return holdings.filter(h => h.type === type);
}

// Helper function to format currency
export function formatCurrency(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// Helper function to format percentage
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}
