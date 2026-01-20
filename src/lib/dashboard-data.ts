// Stat card data
export const stats = [
  {
    title: "Total Revenue",
    value: "$1,250",
    change: 12.5,
    changeLabel: "from last month",
  },
  {
    title: "New Customers",
    value: "1,234",
    change: 8.2,
    changeLabel: "from last month",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    change: 4.1,
    changeLabel: "from last month",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    change: -2.3,
    changeLabel: "from last month",
  },
]

// Chart data (12 months)
export const visitorData = [
  { month: "Jan", visitors: 1200, mobile: 400, desktop: 800 },
  { month: "Feb", visitors: 1800, mobile: 600, desktop: 1200 },
  { month: "Mar", visitors: 2400, mobile: 900, desktop: 1500 },
  { month: "Apr", visitors: 2100, mobile: 750, desktop: 1350 },
  { month: "May", visitors: 2800, mobile: 1000, desktop: 1800 },
  { month: "Jun", visitors: 3200, mobile: 1200, desktop: 2000 },
  { month: "Jul", visitors: 3500, mobile: 1400, desktop: 2100 },
  { month: "Aug", visitors: 3100, mobile: 1100, desktop: 2000 },
  { month: "Sep", visitors: 3800, mobile: 1500, desktop: 2300 },
  { month: "Oct", visitors: 4200, mobile: 1700, desktop: 2500 },
  { month: "Nov", visitors: 4500, mobile: 1800, desktop: 2700 },
  { month: "Dec", visitors: 4800, mobile: 2000, desktop: 2800 },
]

// Customer table data
export interface Customer {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  amount: number
  date: string
}

export const customers: Customer[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "active", amount: 250.00, date: "2024-01-15" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "active", amount: 150.00, date: "2024-01-14" },
  { id: "3", name: "Carol Williams", email: "carol@example.com", status: "pending", amount: 350.00, date: "2024-01-13" },
  { id: "4", name: "David Brown", email: "david@example.com", status: "inactive", amount: 450.00, date: "2024-01-12" },
  { id: "5", name: "Eva Davis", email: "eva@example.com", status: "active", amount: 550.00, date: "2024-01-11" },
  { id: "6", name: "Frank Miller", email: "frank@example.com", status: "active", amount: 200.00, date: "2024-01-10" },
  { id: "7", name: "Grace Wilson", email: "grace@example.com", status: "pending", amount: 175.00, date: "2024-01-09" },
  { id: "8", name: "Henry Taylor", email: "henry@example.com", status: "active", amount: 325.00, date: "2024-01-08" },
  { id: "9", name: "Ivy Anderson", email: "ivy@example.com", status: "inactive", amount: 125.00, date: "2024-01-07" },
  { id: "10", name: "Jack Thomas", email: "jack@example.com", status: "active", amount: 475.00, date: "2024-01-06" },
]

// Sidebar navigation data
export const sidebarNavigation = {
  main: [
    { title: "Home", icon: "House", href: "/" },
    { title: "Dashboard", icon: "ChartLine", href: "/dashboard", isActive: true },
    { title: "Analytics", icon: "ChartBar", href: "#" },
  ],
  projects: {
    title: "Projects",
    icon: "Folder",
    items: [
      { title: "All Projects", href: "#" },
      { title: "Active", href: "#" },
      { title: "Archived", href: "#" },
    ],
  },
  team: {
    title: "Team",
    icon: "Users",
    items: [
      { title: "Members", href: "#" },
      { title: "Permissions", href: "#" },
      { title: "Invite", href: "#" },
    ],
  },
}
