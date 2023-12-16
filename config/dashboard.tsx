import {
  BarChart2,
  Cable,
  Cog,
  Computer,
  CreditCard,
  Home,
  MoreHorizontal,
  UserCircle2,
  Users2,
} from "lucide-react"

import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  settingNav: [
    {
      title: "Profile",
      href: "/app/settings/my-account",
      icon: <UserCircle2 />,
    },
    {
      title: "Workspace",
      href: "#",
      icon: <Computer />,
      subItems:[
       
        {
          title: "Members",
          href: "/app/settings/workspace/members",
          icon: <Users2 />
        },
        {
          title: "Setting",
          href: "/app/settings/workspace",
          icon: <Cog />
        },
      ],
     
    },

    {
      title: "Billing",
      href: "/app/settings/billing",
      icon: <CreditCard />
    },

   
  ],
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
      href: "/app/settings/my-account",
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
      href: "/app/settings/",
      icon: <Cog />,
    },
    {
      title: "More",
      href: "/app/menu",
      icon: <MoreHorizontal />,
    },
  ],
}
