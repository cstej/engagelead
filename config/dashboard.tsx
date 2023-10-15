import { BarChart2, Cable, Cog, Home, MoreHorizontal } from "lucide-react"

import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {

  sidebarNav: [
    {
      title: "Dashboard",
      href: "/app",
      icon: <Home />,
    },
    {
      title: "Leads",
      href: "/app/leads",
      icon: <BarChart2 />,
    },
    {
      title: "Integration",
      href: "/app/integration",
      icon: <Cable />,
    },
    {
      title: "Settings",
      href: "/app/settings",
      icon: <Cog />,
    },
  ],

  sidebarNavMobile: [
    {
      title: "Dashboard",
      href: "/app",
      icon: <Home />,
    },
    {
      title: "Leads",
      href: "/app/leads",
      icon: <BarChart2 />,
    },
    {
      title: "Integration",
      href: "/app/integration",
      icon: <Cable />,
    },
    {
      title: "Settings",
      href: "/app/settings",
      icon: <Cog />,
    },
    {
      title: "More",
      href: "/app/menu",
      icon: <MoreHorizontal />,
    }
  ],
}