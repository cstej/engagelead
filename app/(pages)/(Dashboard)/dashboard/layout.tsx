import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import DashbordHeader from "./_components/dashboard-nav"
import { DashboardNav } from "./_components/dashboard-sidenav"
import { dashboardConfig } from "./config/dashboard"
import WorkspaceProvider from "@/components/workspace-provider"

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
    <WorkspaceProvider>

    <div className="flex min-h-screen flex-col">
      <DashbordHeader />

      <div className="grid flex-1 px-5   md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col border-r pr-6 md:flex ">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6 pl-6">
          {children}
        </main>
      </div>
    </div>
    </WorkspaceProvider>

  )
}

export default DashboardLayout