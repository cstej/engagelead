import React from "react"

import MobileNav from "./_components/MobileNav"
import { SideBar } from "./_components/SideBar"
import { dashboardConfig } from "../../../../config/dashboard"

type Props = {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: Props) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className=" grid flex-1 md:grid-cols-[250px_1fr]">
        <aside className=" hidden border-r pr-6   dark:bg-black md:flex md:flex-col ">
          <SideBar items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden  p-[10px] md:p-[20px]">
          {children}
        </main>
      </div>

      <div className="fixed bottom-0">
        <MobileNav />
      </div>
    </div>
  )
}

export default DashboardLayout
