import React from "react"
import { getServerSession } from "next-auth"

import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"

import { MainNav } from "./main-nav"
import { UserAccountNav } from "./user-account-nav"

type Props = {}

const DashbordHeader = async (props: Props) => {
  const session = await getServerSession(authOptions)
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0 ">
        <MainNav items={siteConfig.dashboardMainNav} />
        <UserAccountNav user={session?.user} />
      </div>
    </header>
  )
}

export default DashbordHeader
