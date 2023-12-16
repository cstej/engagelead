import React from "react"
import { Bell } from "lucide-react"

import { dashboardConfig } from "@/config/dashboard"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"

import SideNav from "./SideNav"
import { WorkspaceSwitcher } from "./workspace-switcher"

export async function SideBar() {
  const sideNavItems = dashboardConfig.sidebarNav
  const settingsNavItems = dashboardConfig.settingNav

  return (
    <div className="fixed w-[250px]  overflow-y-auto  border-r bg-primary-foreground ">
      <div className="relative flex h-screen flex-col ">
        <div className="my-4 flex items-center justify-between pl-2 pr-4">
          <WorkspaceSwitcher />
          {/* @ts-ignore */}

          <div className="rounded-full border p-2">
            <Bell className="h-4 w-4 " />
          </div>
        </div>
        <SideNav
          sideNavItems={sideNavItems}
          settingsNavItems={settingsNavItems}
        />
        <div className="absolute bottom-[20px] left-[50%] translate-x-[-50%]">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
