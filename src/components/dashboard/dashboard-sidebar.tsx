"use client"

import * as React from "react"
import Link from "next/link"
import {
  House,
  ChartLine,
  TrendUp,
  Eye,
  ArrowsLeftRight,
  FileText,
  Gear,
  SignOut,
  CaretDown,
  ChartPieSlice,
  CurrencyDollar,
  CurrencyBtc,
  Coins,
} from "@phosphor-icons/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const mainNavItems = [
  { title: "Home", icon: House, href: "/", isActive: false },
  { title: "Portfolio", icon: ChartPieSlice, href: "/dashboard", isActive: true },
  { title: "Markets", icon: TrendUp, href: "#", isActive: false },
  { title: "Watchlist", icon: Eye, href: "#", isActive: false },
]

const assetItems = [
  { title: "Stocks & ETFs", href: "#", icon: ChartLine },
  { title: "Cryptocurrency", href: "#", icon: CurrencyBtc },
  { title: "Forex", href: "#", icon: CurrencyDollar },
  { title: "Metals", href: "#", icon: Coins },
]

const activityItems = [
  { title: "Transactions", href: "#" },
  { title: "Reports", href: "#" },
  { title: "Tax Documents", href: "#" },
]

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center bg-primary text-primary-foreground">
                  <ChartPieSlice className="size-4" weight="fill" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Portfolio Tracker</span>
                  <span className="truncate text-xs text-muted-foreground">Trading Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Assets">
                      <Coins className="size-4" />
                      <span>Assets</span>
                      <CaretDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {assetItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={item.href}>
                              <item.icon className="size-3" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Activity">
                      <FileText className="size-4" />
                      <span>Activity</span>
                      <CaretDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {activityItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={item.href}>
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="#">
                    <Gear className="size-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="size-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">John Doe</span>
                <span className="truncate text-xs text-muted-foreground">investor@example.com</span>
              </div>
              <SignOut className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
