'use client';

import Link from 'next/link';
import { LandingHeader } from '@/components/landing/landing-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartPieSlice,
  TrendUp,
  Shield,
  ChartLine,
  CurrencyBtc,
  Coins,
  ArrowRight
} from '@phosphor-icons/react';

const features = [
  {
    icon: ChartPieSlice,
    title: 'Multi-Asset Tracking',
    description: 'Track stocks, ETFs, cryptocurrencies, precious metals, and forex in one unified dashboard.',
  },
  {
    icon: TrendUp,
    title: 'Real-Time Performance',
    description: 'Monitor your portfolio performance with live updates and detailed analytics.',
  },
  {
    icon: ChartLine,
    title: 'Interactive Charts',
    description: 'Visualize your investments with beautiful, interactive charts and graphs.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your financial data is protected with industry-standard security practices.',
  },
  {
    icon: CurrencyBtc,
    title: 'Crypto Support',
    description: 'Full support for major cryptocurrencies including Bitcoin, Ethereum, and more.',
  },
  {
    icon: Coins,
    title: 'Asset Allocation',
    description: 'View your portfolio diversification at a glance with detailed breakdowns.',
  },
];

const stats = [
  { label: 'Assets Tracked', value: '5 Types' },
  { label: 'Portfolio Value', value: '$344K+' },
  { label: 'Holdings', value: '18' },
  { label: 'Performance', value: '+19.9%' },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />

      {/* Hero Section */}
      <section className="container flex flex-col items-center gap-8 pb-16 pt-20 md:pt-28">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
            Track Your Investments
            <br className="hidden sm:inline" />
            <span className="text-primary"> All in One Place</span>
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            A professional trading portfolio dashboard to monitor and manage your investments across stocks, ETFs, cryptocurrencies, metals, and forex markets.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" weight="bold" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 md:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Powerful Features
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground">
            Everything you need to manage your investment portfolio effectively
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" weight="duotone" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl mb-4">
            Built with Modern Technologies
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Portfolio Tracker is built using Next.js 16, React 19, shadcn/ui, and Tailwind CSS 4.
            It features a dark-mode-first design optimized for professional traders and investors.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" weight="bold" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Built with shadcn/ui. Powered by Next.js.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
