import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import DashbordHeader from "./components/dashboard-nav"
import { DashboardNav } from "./components/dashboard-sidenav"
import { dashboardConfig } from "./config/dashboard"

type Props = {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions)
  if (session) {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      include: {
        workspaces : true
      },
    })
    
    if (!user || !user.workspaces.length) {
      redirect("/workspace")
    }
  }
  return (
    <div className="flex min-h-screen flex-col">
      <DashbordHeader />

      <div className="container grid flex-1   md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col border-r pr-6 md:flex ">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6 pl-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
