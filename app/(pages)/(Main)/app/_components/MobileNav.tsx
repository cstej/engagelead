"use client"
import React from "react"
import Link from "next/link"


import { cn } from "@/lib/utils"

import { dashboardConfig } from "../../../../../config/dashboard"
import { usePathname } from "next/navigation"

type Props = {}

function MobileNav({}: Props) {
    const path = usePathname()
  return (
    <div className="flex w-screen items-center justify-evenly gap-2 bg-black dark:bg-black md:hidden">
      {dashboardConfig.sidebarNavMobile.map((item, index) => {
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <div key={index} className={cn("flex flex-col items-center pb-1 pt-3  ",  path === item.href ? " text-white" : "text-muted-foreground")}>
                {React.cloneElement(item.icon, {
                  className: cn("h-4 w-4  "),
                })}
                <span className="text-sm">{item.title}</span>
              </div>
            </Link>
          )
        )
      })}
    </div>
  )
}

export default MobileNav
